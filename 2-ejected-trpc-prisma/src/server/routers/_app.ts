/**
 * This file contains the root router of your tRPC-backend
 */
import { t } from '../trpc';
import { graphRouter } from './graph';

export const appRouter = t.router({
  graph: graphRouter,
});

export type AppRouter = typeof appRouter;
