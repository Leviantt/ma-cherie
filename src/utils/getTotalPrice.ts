import type { Dessert, DessertsOrders } from '@prisma/client';

export function getTotalPrice(
	desserts: (DessertsOrders & { dessert: Dessert })[]
): number {
	return desserts.reduce(
		(sum: number, d) => d.dessertsNumber * +d.dessert.price + sum,
		0
	);
}
