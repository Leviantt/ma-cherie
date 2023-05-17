import type { Client, Dessert, Employee } from '@prisma/client';

export function makeCompareEmployees(searchInput: string) {
	return function (a: Employee, b: Employee) {
		return compare(a.fullName, b.fullName, searchInput);
	};
}

export function makeCompareDesserts(searchInput: string) {
	return function (a: Dessert, b: Dessert) {
		return compare(a.name, b.name, searchInput);
	};
}

export function makeCompareClients(searchInput: string) {
	return function (a: Client, b: Client) {
		return compare(a.fullName, b.fullName, searchInput);
	};
}

// first comes operand that startsWith searchInput
// if none of them do then comes operand that includes searchInput
// if none of them do then operands sorted alphabetically
function compare(_a: string, _b: string, _searchInput: string) {
	const a = _a.toLowerCase();
	const b = _b.toLowerCase();
	const searchInput = _searchInput.toLowerCase();

	if (a.startsWith(searchInput) && b.startsWith(searchInput)) {
		if (a.includes(searchInput) && b.includes(searchInput)) {
			return a.localeCompare(b);
		} else {
			if (a.includes(searchInput)) return -1;
			if (b.includes(searchInput)) return 1;
		}
	} else {
		if (a.startsWith(searchInput)) return -1;
		if (b.startsWith(searchInput)) return 1;

		if (a.includes(searchInput) && b.includes(searchInput))
			return a.localeCompare(b);
		else {
			if (a.includes(searchInput)) return -1;
			if (b.includes(searchInput)) return 1;
		}
	}

	if (a.startsWith(searchInput)) return -1;

	if (b.startsWith(searchInput)) return 1;

	return a.localeCompare(b);
}
