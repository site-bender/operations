import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"

export default function getCalendar(
	d: Temporal.Calendar | string,
): Temporal.Calendar | Temporal.CalendarProtocol {
	if (d instanceof Temporal.Calendar) {
		return d
	}

	return Temporal.Calendar.from(d)
}
