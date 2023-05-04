import type { Dessert } from '@prisma/client';

export function getTotalPrice(desserts: Dessert[]): number {
	return desserts.reduce(
		(sum: number, dessert: Dessert) => +dessert.price + sum,
		0
	);
}
