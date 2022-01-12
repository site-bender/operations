export default function convertTimezoneOffsetToHoursMinutes(
	timezoneOffset: number,
): string {
	const hours = Math.floor(timezoneOffset / 60)
	const minutes = timezoneOffset % 60
	const paddedHours = hours < 10 ? `0${hours}` : hours
	const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

	return `${paddedHours}:${paddedMinutes}`
}
