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
// a is closer -1
// b is closer 1
export function compareClosestToCurrentDay(a: Client, b: Client) {
	const now = getPastDaysInYear(new Date());
	const aDays = getPastDaysInYear(a.birthdate);
	const bDays = getPastDaysInYear(b.birthdate);

	console.log('now');
	console.log(now);
	console.log('aTimeWithoutYear');
	console.log(aDays);
	console.log('bTimeWithoutYear');
	console.log(bDays);

	if (aDays <= now && bDays <= now) {
		return aDays - bDays;
	} else if (aDays <= now) {
		return 1;
	} else if (aDays <= now) {
		return -1;
	}
	return bDays - aDays;
}

export function getPastDaysInYear(date: Date): number {
	const firstDay = new Date(date.getFullYear(), 0, 1);
	const difference = date.getTime() - firstDay.getTime();
	const days = Math.ceil(difference / (1000 * 3600 * 24));
	return days;
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
