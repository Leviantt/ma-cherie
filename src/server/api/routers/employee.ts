import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import type { Prisma, Employee } from '@prisma/client';

export const employeeRouter = createTRPCRouter({
	getAll: publicProcedure.query(({ ctx }): Prisma.PrismaPromise<Employee[]> => {
		return ctx.prisma.employee.findMany();
	}),
	getOne: publicProcedure
		.input(z.object({ id: z.number().int() }))
		.query(({ ctx, input }): Prisma.PrismaPromise<Employee | null> => {
			return ctx.prisma.employee.findUnique({ where: { id: input.id } });
		}),
	getManagers: publicProcedure.query(
		({ ctx }): Prisma.PrismaPromise<Employee[]> => {
			return ctx.prisma.employee.findMany({
				where: {
					OR: [
						{ position: { equals: 'manager', mode: 'insensitive' } },
						{ position: { equals: 'менеджер', mode: 'insensitive' } },
					],
				},
			});
		}
	),
	create: publicProcedure
		.input(
			z.object({
				fullName: z.string(),
				phone: z.string(),
				email: z.string().email(),
				workEmail: z.string().email(),
				pathToAvatarPhoto: z.string(),
				position: z.string(),
				age: z.number().int(),
				hireDate: z.date(),
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.employee.create({
				data: {
					...input,
				},
			});
		}),
	delete: publicProcedure
		.input(z.object({ id: z.number().int() }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.employee.delete({
				where: {
					id: input.id,
				},
			});
		}),
	update: publicProcedure
		.input(
			z.object({
				id: z.number().int(),
				fullName: z.string().optional(),
				phone: z.string().optional(),
				email: z.string().email().optional(),
				workEmail: z.string().email().optional(),
				pathToAvatarPhoto: z.string().optional(),
				position: z.string().optional(),
				age: z.number().int().optional(),
				hireDate: z.date().optional(),
			})
		)
		.mutation(({ ctx, input }) => {
			const { id, ...newData } = input;
			return ctx.prisma.employee.update({
				where: {
					id,
				},
				data: { ...newData },
			});
		}),
	addOrder: publicProcedure
		.input(z.object({ id: z.number().int(), orderId: z.number().int() }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.employee.update({
				where: {
					id: input.id,
				},
				data: {
					orders: {
						connect: {
							id: input.orderId,
						},
					},
				},
			});
		}),
});
