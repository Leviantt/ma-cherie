import type { Request } from '@prisma/client';

export type RequestWithDessert = Request & {
	dessert: {
		id: number;
		name: string;
	};
};
