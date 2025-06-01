



export function getDaysBetweenDates(startDate, endDate) {
	const days = [];

	for (
		let dt = new Date(startDate);
		dt <= endDate;
		dt.setDate(dt.getDate() + 1)
	) {
		days.push({
			date: dt.getDate(),
			dateObject: new Date(dt),
		});
	}

	return days;
}
