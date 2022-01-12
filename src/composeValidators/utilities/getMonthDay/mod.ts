import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"

export default function getMonthDay(
	d: string | Date | Temporal.PlainMonthDay,
): Temporal.PlainMonthDay {
	if (d instanceof Temporal.PlainMonthDay) {
		return d
	}

	return (
		(d instanceof Date && Temporal.PlainMonthDay.from(d.toISOString())) ||
		Temporal.PlainMonthDay.from(d as string)
	)
}
