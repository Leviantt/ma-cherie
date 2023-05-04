import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { type Prisma, Status } from '@prisma/client';
import type { OrderWithDesserts } from '~/types/OrderWithDesserts';
import type { OrderExtended } from '~/types/OrderExtended';

export const orderRouter = createTRPCRouter({
	getAllWithDesserts: publicProcedure.query(
		({ ctx }): Prisma.PrismaPromise<OrderWithDesserts[]> => {
			return ctx.prisma.order.findMany({
				include: {
					desserts: {
						include: {
							dessert: true,
						},
					},
				},
			});
		}
	),
	getOneExtended: publicProcedure
		.input(z.object({ id: z.number().int() }))
		.query(({ ctx, input }): Prisma.PrismaPromise<OrderExtended | null> => {
			return ctx.prisma.order.findUnique({
				where: { id: input.id },
				include: {
					desserts: {
						include: {
							dessert: true,
						},
					},
					client: true,
					manager: true,
				},
			});
		}),
	create: publicProcedure
		.input(
			z.object({
				name: z.string().min(2),
				address: z.string(),
				clientId: z.number().int().positive(),
				deliveryMethod: z.string(),
				deliveryPrice: z.number(),
				managerId: z.number().int().positive(),
				comment: z.string(),
				desserts: z.array(
					z.object({
						dessertId: z.number().int().positive(),
						dessertsNumber: z.number().int().positive(),
					})
				),
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.order.create({
				data: {
					...input,
					desserts: {
						createMany: { data: input.desserts },
					},
				},
			});
		}),
	delete: publicProcedure
		.input(z.object({ id: z.number().int().positive() }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.order.delete({
				where: {
					id: input.id,
				},
			});
		}),
	update: publicProcedure
		.input(
			z.object({
				id: z.number().int().positive(),
				name: z.string().min(2).optional(),
				address: z.string().optional(),
				clientId: z.number().int().positive().optional(),
				deliveryMethod: z.string().optional(),
				deliveryPrice: z.number().optional(),
				managerId: z.number().int().positive().optional(),
				comment: z.string().optional(),
			})
		)
		.mutation(({ ctx, input }) => {
			const { id, ...newData } = input;
			return ctx.prisma.order.update({
				where: {
					id,
				},
				data: { ...newData },
			});
		}),
	addDessert: publicProcedure
		.input(
			z.object({
				id: z.number().int().positive(),
				dessertId: z.number().int().positive(),
				dessertsNumber: z.number().int().positive(),
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.order.update({
				where: {
					id: input.id,
				},
				data: {
					desserts: {
						create: {
							dessertsNumber: input.dessertsNumber,
							dessertId: input.dessertId,
						},
					},
				},
			});
		}),
	deleteDessert: publicProcedure
		.input(
			z.object({
				id: z.number().int().positive(),
				dessertId: z.number().int().positive(),
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.order.update({
				where: {
					id: input.id,
				},
				data: {
					desserts: {
						delete: {
							orderId_dessertId: {
								orderId: input.id,
								dessertId: input.dessertId,
							},
						},
					},
				},
			});
		}),
	changeStatusToAtWork: publicProcedure
		.input(
			z.object({
				id: z.number().int().positive(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.prisma.order.update({
				where: {
					id: input.id,
				},
				data: {
					status: Status.AT_WORK,
				},
			});
		}),
	changeStatusToAtDelivery: publicProcedure
		.input(
			z.object({
				id: z.number().int().positive(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.prisma.order.update({
				where: {
					id: input.id,
				},
				data: {
					status: Status.AT_DELIVERY,
				},
			});
		}),
	complete: publicProcedure
		.input(
			z.object({
				id: z.number().int().positive(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.prisma.order.update({
				where: {
					id: input.id,
				},
				data: {
					status: Status.COMPLETED,
					receivedAt: new Date(),
				},
			});
		}),
	cancel: publicProcedure
		.input(
			z.object({
				id: z.number().int().positive(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.prisma.order.update({
				where: {
					id: input.id,
				},
				data: {
					status: Status.CANCELED,
				},
			});
		}),
});
