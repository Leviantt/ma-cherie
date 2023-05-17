interface HasDate {
	createdAt: Date;
}

export function compareByDate(a: HasDate, b: HasDate): number {
  return a.createdAt.getTime() - b.createdAt.getTime();
}
