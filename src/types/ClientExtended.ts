import type {
	Client,
	Dessert,
	DessertsOrders,
	Employee,
	Order,
} from '@prisma/client';

export type ClientExtended = Client & {
	orders: (Order & {
		desserts: (DessertsOrders & { dessert: Dessert })[];
		manager: Employee;
	})[];
};
