import type { Employee, Order } from '@prisma/client';

export const getFirstManager = (
	orders: (Order & { manager: Employee })[]
) => {
	const minTime = Math.min(...orders.map((o) => o.createdAt.getTime()));
	return orders.find((o) => o.createdAt.getTime() === minTime)?.manager;
};
