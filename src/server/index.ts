import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/_app';

const app = express();

app.use(cors());
app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
  })
);

const port = 3001;
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});