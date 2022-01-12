import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"

export default function getPlainDateTime(
	d: string | Date | Temporal.PlainDateTime,
): Temporal.PlainDateTime {
	if (d instanceof Temporal.PlainDateTime) {
		return d
	}

	return (
		(d instanceof Date &&
			Temporal.PlainDateTime.from({
				year: d.getFullYear(),
				month: d.getMonth() + 1,
				day: d.getDate(),
				hour: d.getHours(),
				minute: d.getMinutes(),
				second: d.getSeconds(),
			})) ||
		Temporal.PlainDateTime.from(String(d).replace("Z", ""))
	)
}
