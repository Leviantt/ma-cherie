import type { Dessert } from '@prisma/client';
import type { RequestWithDessert } from '~/types/RequestWithDessert';

export function filterNewDesserts(
	requests: RequestWithDessert[],
	desserts: Dessert[]
) {
	const oldDesserts = new Set(requests.map((req) => req.dessert.name));
	return desserts.filter((d) => !oldDesserts.has(d.name));
}
