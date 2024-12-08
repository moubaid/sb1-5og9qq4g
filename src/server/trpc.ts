import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { prisma } from './db';
import { verifyToken } from './auth';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

export const createContext = async (opts: CreateNextContextOptions) => {
  const authHeader = opts.req.headers.authorization;
  
  if (!authHeader) {
    return { user: null };
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);

  if (!payload) {
    return { user: null };
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, name: true, role: true },
  });

  return { user };
};

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }
  return next({
    ctx: { ...ctx, user: ctx.user },
  });
});

export const adminProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user || ctx.user.role !== 'admin') {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be an admin to access this resource',
    });
  }
  return next({
    ctx: { ...ctx, user: ctx.user },
  });
});