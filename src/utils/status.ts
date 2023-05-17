import { Status } from '@prisma/client';

export function getColorByStatus(status: Status): string {
	switch (status) {
		case Status.NEW:
			return '#792fbed3';
		case Status.AT_WORK:
			return '#0202cc';
		case Status.AT_DELIVERY:
			return '#b9ae14d3';
		case Status.COMPLETED:
			return '#01ad2cd3';
		default:
			return '#e01919';
	}
}
