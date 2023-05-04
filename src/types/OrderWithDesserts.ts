import type { Dessert, DessertsOrders, Order } from '@prisma/client';

export type OrderWithDesserts = Order & {
	desserts: (DessertsOrders & { dessert: Dessert })[];
};
