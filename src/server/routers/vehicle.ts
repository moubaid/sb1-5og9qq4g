import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../db';

export const vehicleRouter = router({
  list: publicProcedure.query(async () => {
    return prisma.vehicle.findMany({
      include: {
        driver: true,
      },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        plateNumber: z.string(),
        model: z.string(),
        fuelLevel: z.number().min(0).max(100),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.vehicle.create({
        data: input,
      });
    }),

  updateStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(['available', 'in-use', 'maintenance']),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.vehicle.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),

  updateLocation: publicProcedure
    .input(
      z.object({
        id: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.vehicle.update({
        where: { id: input.id },
        data: {
          latitude: input.latitude,
          longitude: input.longitude,
        },
      });
    }),
});