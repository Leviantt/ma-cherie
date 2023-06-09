import { createTRPCRouter } from '~/server/api/trpc';
import { employeeRouter } from './routers/employee';
import { requestRouter } from './routers/request';
import { dessertRouter } from './routers/dessert';
import { orderRouter } from './routers/order';
import { clientRouter } from './routers/client';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	employee: employeeRouter,
	request: requestRouter,
	dessert: dessertRouter,
	order: orderRouter,
	client: clientRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
