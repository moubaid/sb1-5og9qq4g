import { router } from '../trpc';
import { vehicleRouter } from './vehicle';
import { driverRouter } from './driver';
import { scheduleRouter } from './schedule';
import { authRouter } from '../auth';
import { reportRouter } from './report';
import { maintenanceRouter } from './maintenance';

export const appRouter = router({
  auth: authRouter,
  vehicle: vehicleRouter,
  driver: driverRouter,
  schedule: scheduleRouter,
  report: reportRouter,
  maintenance: maintenanceRouter,
});

export type AppRouter = typeof appRouter;