import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { prisma } from '../db';

export const reportRouter = router({
  generate: protectedProcedure
    .input(
      z.object({
        type: z.enum(['daily', 'weekly', 'monthly']),
        startDate: z.string(),
        endDate: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { type, startDate, endDate } = input;
      
      // Fetch relevant data for the report
      const rides = await prisma.ride.findMany({
        where: {
          createdAt: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
        include: {
          driver: true,
          vehicle: true,
        },
      });

      const maintenanceLogs = await prisma.maintenanceLog.findMany({
        where: {
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
        include: {
          vehicle: true,
        },
      });

      // Calculate statistics
      const totalRides = rides.length;
      const totalRevenue = rides.reduce((acc, ride) => acc + (ride.fare || 0), 0);
      const totalMaintenanceCost = maintenanceLogs.reduce(
        (acc, log) => acc + log.cost,
        0
      );

      const reportData = {
        summary: {
          totalRides,
          totalRevenue,
          totalMaintenanceCost,
          netRevenue: totalRevenue - totalMaintenanceCost,
        },
        rides,
        maintenance: maintenanceLogs,
      };

      // Save report
      const report = await prisma.report.create({
        data: {
          type,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          data: JSON.stringify(reportData),
          userId: ctx.user.id,
        },
      });

      return {
        report,
        data: reportData,
      };
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    return prisma.report.findMany({
      where: {
        userId: ctx.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const report = await prisma.report.findFirst({
        where: {
          id: input.id,
          userId: ctx.user.id,
        },
      });

      if (!report) {
        throw new Error('Report not found');
      }

      return {
        ...report,
        data: JSON.parse(report.data),
      };
    }),
});