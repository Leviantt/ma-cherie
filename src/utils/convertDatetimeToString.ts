export function convertDatetimeToString(datetime: Date) {
	return (
		datetime.toLocaleDateString() +
		' ' +
		datetime.toLocaleTimeString().substring(0, 5)
	);
}
