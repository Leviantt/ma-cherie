import type { Client, Dessert, DessertsOrders, Employee, Order } from '@prisma/client';

export type OrderExtended = Order & {
	desserts: (DessertsOrders & { dessert: Dessert })[];
	client: Client;
	manager: Employee;
};
