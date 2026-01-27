export function countWeekdays(startDate: Date, endDate: Date) {
	let count = 0
	const currentDate = new Date(startDate)
	while (currentDate <= endDate) {
		const dayOfWeek = currentDate.getDay()
		// 0 = Sunday, 6 = Saturday
		if (dayOfWeek !== 0 && dayOfWeek !== 6) {
			count++
		}
		currentDate.setDate(currentDate.getDate() + 1)
	}
	return count
}
