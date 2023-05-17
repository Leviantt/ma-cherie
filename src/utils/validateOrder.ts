import { DeliveryMethod } from '@prisma/client';
import { z } from 'zod';
import type { ClientData } from '~/types/ClientData';
import type { Map } from '~/types/Map';

export const DeliveryMethodEnum = z.nativeEnum(DeliveryMethod);

export const validateOrder = (
	name: string,
	address: string,
	clientId: number,
	managerId: number,
	deliveryMethod: DeliveryMethod,
	deliveryPrice: number,
	comment: string,
	clientData: ClientData,
	addedDesserts: Map
) => {
	const desserts = [];
	for (const [key, value] of Object.entries(addedDesserts)) {
		desserts.push({ dessertId: +key, dessertsNumber: value });
	}
	const validated = z
		.object({
			name: z.string().min(2),
			address: z.string().min(2),
			clientId: z.number().int().nonnegative(),
			managerId: z.number().int().positive(),
			deliveryMethod: DeliveryMethodEnum,
			deliveryPrice: z.number().nonnegative(),
			comment: z.string(),
			clientData: z.object({
				fullName: z.string(),
				birthdate: z.date(),
				phone: z.string(),
				source: z.string(),
			}),
			desserts: z
				.array(
					z.object({
						dessertId: z.number().int().positive(),
						dessertsNumber: z.number().int().positive(),
					})
				)
				.min(1),
		})
		.parse({
			name,
			address,
			clientId,
			managerId,
			deliveryMethod,
			deliveryPrice,
			comment,
			clientData,
			desserts,
		});

	return validated;
};
