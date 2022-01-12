import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"

export default function getPlainDate(
	d: string | Date | Temporal.PlainDate,
): Temporal.PlainDate {
	if (d instanceof Temporal.PlainDate) {
		return d
	}

	return (
		(d instanceof Date &&
			Temporal.PlainDate.from({
				year: d.getFullYear(),
				month: d.getMonth() + 1,
				day: d.getDate(),
			})) ||
		Temporal.PlainDate.from(d as string)
	)
}
