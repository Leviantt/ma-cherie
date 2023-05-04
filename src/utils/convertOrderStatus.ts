import type { Status } from '@prisma/client';

const statusesInRussian = {
	NEW: 'новый',
	AT_WORK: 'в работе',
	AT_DELIVERY: 'в доставке',
	COMPLETED: 'завершён',
	CANCELED: 'отменен',
} as const;

export function convertOrderStatus(status: Status) {
	return statusesInRussian[status];
}
