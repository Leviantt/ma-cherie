import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import type { Dessert, Prisma, Request } from '@prisma/client';

export const requestRouter = createTRPCRouter({
	getAll: publicProcedure.query(
		({ ctx }): Prisma.PrismaPromise<(Request & { dessert: Dessert })[]> => {
			return ctx.prisma.request.findMany({ include: { dessert: true } });
		}
	),
	getOne: publicProcedure
		.input(z.object({ id: z.number().int() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.request.findUnique({
				where: { id: input.id },
				include: {
					dessert: {
						select: {
							name: true,
						},
					},
				},
			});
		}),
	getAllByAddress: publicProcedure
		.input(z.object({ address: z.string() }))
		.query(
			({
				ctx,
				input,
			}): Prisma.PrismaPromise<
				(Request & { dessert: { id: number; name: string } })[]
			> => {
				return ctx.prisma.request.findMany({
					where: { address: input.address },
					include: {
						dessert: {
							select: { id: true, name: true },
						},
					},
				});
			}
		),
	create: publicProcedure
		.input(
			z.object({
				address: z.string(),
				mondayCount: z.number().int().optional(),
				tuesdayCount: z.number().int().optional(),
				wednesdayCount: z.number().int().optional(),
				thursdayCount: z.number().int().optional(),
				fridayCount: z.number().int().optional(),
				saturdayCount: z.number().int().optional(),
				sundayCount: z.number().int().optional(),
				dessertId: z.number().int(),
			})
		)
		.mutation(({ ctx, input }) => {
			const { dessertId, ...newRequest } = input;
			return ctx.prisma.request.create({
				data: {
					...newRequest,
					dessert: {
						connect: { id: dessertId },
					},
				},
			});
		}),
	delete: publicProcedure
		.input(z.object({ id: z.number().int() }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.request.delete({
				where: {
					id: input.id,
				},
			});
		}),
	update: publicProcedure
		.input(
			z.object({
				id: z.number().int(),
				address: z.string().optional(),
				mondayCount: z.number().int().optional(),
				tuesdayCount: z.number().int().optional(),
				wednesdayCount: z.number().int().optional(),
				thursdayCount: z.number().int().optional(),
				fridayCount: z.number().int().optional(),
				saturdayCount: z.number().int().optional(),
				sundayCount: z.number().int().optional(),
			})
		)
		.mutation(({ ctx, input }) => {
			const { id, ...newData } = input;
			return ctx.prisma.request.update({
				where: {
					id,
				},
				data: { ...newData },
			});
		}),
	updateDessert: publicProcedure
		.input(
			z.object({
				id: z.number().int(),
				newDessertId: z.number().int(),
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.request.update({
				where: {
					id: input.id,
				},
				data: {
					dessertId: input.newDessertId,
				},
				include: {
					dessert: true,
				},
			});
		}),
});
