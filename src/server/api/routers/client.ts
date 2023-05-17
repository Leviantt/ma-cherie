import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import type { Prisma } from '@prisma/client';
import type { ClientExtended } from '~/types/ClientExtended';

export const clientRouter = createTRPCRouter({
	getAll: publicProcedure.query(
		({ ctx }): Prisma.PrismaPromise<ClientExtended[]> => {
			return ctx.prisma.client.findMany({
				include: {
					orders: {
						include: {
							desserts: {
								include: {
									dessert: true,
								},
							},
							manager: true,
						},
					},
				},
			});
		}
	),
	delete: publicProcedure
		.input(z.object({ id: z.number().int() }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.client.delete({
				where: {
					id: input.id,
				},
			});
		}),
});
