import type { Dessert } from '@prisma/client';
import type { Map } from '~/types/Map';
import type { OrderWithDesserts } from '~/types/OrderWithDesserts';

export const calculateTotal = (addedDesserts: Map, desserts: Dessert[]) => {
	let total = 0;
	for (const dessert of desserts) {
		const count = addedDesserts[dessert.id];
		if (count) {
			total += +dessert.price * count;
		}
	}
	return total;
};

export const calculateTotalClientExpenses = (orders: OrderWithDesserts[]) => {
  console.log(orders);
	return orders.reduce(
		(sum, order) =>
			sum +
			+order.deliveryPrice +
			order.desserts.reduce(
				(sum, d) => sum + d.dessertsNumber * +d.dessert.price,
				0
			),
		0
	);
};
