export function convertDatetimeToString(datetime: Date) {
	return (
		datetime.toLocaleDateString() +
		' ' +
		datetime.toLocaleTimeString().substring(0, 5)
	);
}

export function convertDateForValue(date?: Date): string {
	if (!date) return new Date().toISOString().substring(0, 10);

	return date.toISOString().substring(0, 10);
}
