import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { type Prisma, Status } from '@prisma/client';
import type { OrderWithDesserts } from '~/types/OrderWithDesserts';
import type { OrderExtended } from '~/types/OrderExtended';
import { DeliveryMethodEnum } from '~/utils/validateOrder';
import type { StatData } from '~/types/StatData';

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
				deliveryMethod: DeliveryMethodEnum,
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
	createWithNewClient: publicProcedure
		.input(
			z.object({
				name: z.string().min(2),
				address: z.string(),
				deliveryMethod: DeliveryMethodEnum,
				deliveryPrice: z.number(),
				clientData: z.object({
					fullName: z.string(),
					birthdate: z.date(),
					phone: z.string(),
					source: z.string(),
				}),
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
			const { clientData, ...orderDataWithDesserts } = input;
			const { desserts, ...orderData } = orderDataWithDesserts;
			return ctx.prisma.client.create({
				data: {
					...clientData,
					orders: {
						create: [
							{
								...orderData,
								desserts: {
									createMany: { data: desserts },
								},
							},
						],
					},
				},
			});
		}),
	delete: publicProcedure
		.input(z.object({ id: z.number().int().positive() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.order.update({
				where: {
					id: input.id,
				},
				data: {
					desserts: {
						deleteMany: {},
					},
				},
			});

			await ctx.prisma.client.deleteMany({
				where: {
					orders: {
						none: {},
					},
				},
			});

			return await ctx.prisma.order.delete({
				where: {
					id: input.id,
				},
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
	getStatistics: publicProcedure
		.input(z.object({ startDate: z.date(), endDate: z.date() }))
		.query(async ({ ctx, input }): Promise<StatData[]> => {
			const orders = await ctx.prisma.order.findMany({
				where: {
					AND: [
						{
							createdAt: {
								gte: input.startDate,
							},
						},
						{
							createdAt: {
								lte: input.endDate,
							},
						},
					],
				},
				include: {
					desserts: {
						include: {
							dessert: true,
						},
					},
				},
			});
			const completedOrdersNumber = await ctx.prisma.order.count({
				where: {
					AND: [
						{
							createdAt: {
								gte: input.startDate,
							},
						},
						{
							createdAt: {
								lte: input.endDate,
							},
						},
						{
							status: Status.COMPLETED,
						},
					],
				},
			});
			const canceledOrdersNumber = await ctx.prisma.order.count({
				where: {
					AND: [
						{
							createdAt: {
								gte: input.startDate,
							},
						},
						{
							createdAt: {
								lte: input.endDate,
							},
						},
						{
							status: Status.CANCELED,
						},
					],
				},
			});
			const clientsNumber = await ctx.prisma.client.count({
				where: {
					AND: [
						{
							registrationDate: {
								gte: input.startDate,
							},
						},
						{
							registrationDate: {
								lte: input.endDate,
							},
						},
					],
				},
			});
			const employeesNumber = await ctx.prisma.employee.count({
				where: {
					AND: [
						{
							hireDate: {
								gte: input.startDate,
							},
						},
						{
							hireDate: {
								lte: input.endDate,
							},
						},
					],
				},
			});
			const income = orders.reduce(
				(sum, order) =>
					sum +
					order.desserts.reduce(
						(s, d) => s + d.dessertsNumber * +d.dessert.price,
						0
					) +
					+order.deliveryPrice,
				0
			);

			return [
				{
					number: orders.length,
					title: 'orders',
				},
				{
					number: completedOrdersNumber,
					title: 'completed-orders',
				},
				{
					number: canceledOrdersNumber,
					title: 'canceled-orders',
				},
				{
					number: clientsNumber,
					title: 'clients',
				},
				{
					number: employeesNumber,
					title: 'employees',
				},
				{
					number: income,
					title: 'income',
				},
			];
		}),
});
