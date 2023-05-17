import { Status } from '@prisma/client';
import type { OrderWithDesserts } from '~/types/OrderWithDesserts';

// const notCompletedOrders = new Set([
// 	Status.NEW,
// 	Status.AT_WORK,
// 	Status.AT_DELIVERY,
// ]);

export function filterByStatus(
	orders: OrderWithDesserts[],
	flags: boolean[]
): OrderWithDesserts[] {
	if (flags[0]) return orders.filter((o) => o.status === Status.NEW);
	if (flags[1]) return orders.filter((o) => o.status === Status.AT_WORK);
	if (flags[2]) return orders.filter((o) => o.status === Status.AT_DELIVERY);
	if (flags[3]) return orders.filter((o) => o.status === Status.COMPLETED);
	if (flags[4]) return orders.filter((o) => o.status === Status.CANCELED);

	return orders.filter(
		(order) =>
			order.status === Status.NEW ||
			order.status === Status.AT_WORK ||
			order.status === Status.AT_DELIVERY
	);
}
