import type { Dessert } from '@prisma/client';
import { Map } from '~/types/Map';

export function filterAddedDesserts(
	desserts: Dessert[],
	addedDessertIds: Map
): [Dessert[], Dessert[]] {
	const added = desserts.filter((d) => addedDessertIds[d.id] != undefined);
	const notAdded = desserts.filter((d) => addedDessertIds[d.id] == undefined);
	return [added, notAdded];
}
