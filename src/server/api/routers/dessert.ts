import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import type { Prisma, Dessert } from '@prisma/client';

export const dessertRouter = createTRPCRouter({
	getAll: publicProcedure.query(({ ctx }): Prisma.PrismaPromise<Dessert[]> => {
		return ctx.prisma.dessert.findMany();
	}),
	getOne: publicProcedure
		.input(z.object({ id: z.number().int() }))
		.query(({ ctx, input }): Prisma.PrismaPromise<Dessert | null> => {
			return ctx.prisma.dessert.findUnique({ where: { id: input.id } });
		}),
	create: publicProcedure
		.input(
			z.object({
				name: z.string(),
				price: z.number(),
				description: z.string(),
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.dessert.create({
				data: {
					...input,
				},
			});
		}),
	delete: publicProcedure
		.input(z.object({ id: z.number().int() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.dessert.update({
				where: {
					id: input.id,
				},
				data: {
					requests: {
						deleteMany: {},
					},
				},
			});
			return ctx.prisma.dessert.delete({
				where: {
					id: input.id,
				},
			});
		}),
	update: publicProcedure
		.input(
			z.object({
				id: z.number().int(),
				name: z.string().optional(),
				price: z.number().optional(),
				description: z.string().optional(),
			})
		)
		.mutation(({ ctx, input }) => {
			const { id, ...newData } = input;
			return ctx.prisma.dessert.update({
				where: {
					id,
				},
				data: { ...newData },
			});
		}),
});
