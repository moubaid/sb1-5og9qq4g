import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../db';

export const driverRouter = router({
  list: publicProcedure.query(async () => {
    return prisma.driver.findMany({
      include: {
        currentVehicle: true,
        rides: true,
      },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string(),
        licenseNumber: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.driver.create({
        data: input,
      });
    }),

  updateStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(['available', 'on-trip', 'off-duty']),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.driver.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),

  assignVehicle: publicProcedure
    .input(
      z.object({
        driverId: z.string(),
        vehicleId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.driver.update({
        where: { id: input.driverId },
        data: {
          vehicleId: input.vehicleId,
          status: 'available',
        },
      });
    }),
});