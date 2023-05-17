import type { Order } from '@prisma/client';

export const getLastOrder = (orders: Order[]) => {
	const maxTime = Math.max(...orders.map((o) => o.createdAt.getTime()));
	return orders.find((o) => o.createdAt.getTime() === maxTime);
};
