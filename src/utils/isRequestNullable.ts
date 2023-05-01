import type { RequestWithCounts } from '~/types/RequestWithCounts';

export function isRequestNullable(request: RequestWithCounts): boolean {
	return [
		request.mondayCount,
		request.tuesdayCount,
		request.wednesdayCount,
		request.thursdayCount,
		request.fridayCount,
		request.sundayCount,
	].every((count) => count === 0);
}
