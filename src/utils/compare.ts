import type { Employee } from '@prisma/client';

// first comes employee whose fullName startsWith searchInput
// if none of them do then comes employee whose fullName includes searchInput
// if none of them do then employees sorted alphabetically
export function makeCompareEmployees(searchInput: string) {
	return function (a: Employee, b: Employee) {
		if (
			a.fullName.startsWith(searchInput) &&
			b.fullName.startsWith(searchInput)
		) {
			if (
				a.fullName.includes(searchInput) &&
				b.fullName.includes(searchInput)
			) {
				return a.fullName.localeCompare(b.fullName);
			} else {
				if (a.fullName.includes(searchInput)) return -1;
				if (b.fullName.includes(searchInput)) return 1;
			}
		} else {
			if (a.fullName.startsWith(searchInput)) return -1;
			if (b.fullName.startsWith(searchInput)) return 1;

			if (a.fullName.includes(searchInput) && b.fullName.includes(searchInput))
				return a.fullName.localeCompare(b.fullName);
			else {
				if (a.fullName.includes(searchInput)) return -1;
				if (b.fullName.includes(searchInput)) return 1;
			}
		}

		if (a.fullName.startsWith(searchInput)) return -1;

		if (b.fullName.startsWith(searchInput)) return 1;

		return a.fullName.localeCompare(b.fullName);
	};
}
