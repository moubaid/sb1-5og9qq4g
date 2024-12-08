import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../db';

export const scheduleRouter = router({
  list: publicProcedure.query(async () => {
    return prisma.ride.findMany({
      include: {
        driver: true,
        vehicle: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        pickupLatitude: z.number(),
        pickupLongitude: z.number(),
        pickupAddress: z.string(),
        dropoffLatitude: z.number(),
        dropoffLongitude: z.number(),
        dropoffAddress: z.string(),
        driverId: z.string().optional(),
        vehicleId: z.string().optional(),
        estimatedArrival: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.ride.create({
        data: input,
      });
    }),

  updateStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(['pending', 'accepted', 'in-progress', 'completed']),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.ride.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),
});