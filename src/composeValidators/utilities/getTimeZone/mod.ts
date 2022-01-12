import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"

export default function getTimeZone(
	d: string | Date | Temporal.TimeZone,
): Temporal.TimeZone {
	if (d instanceof Temporal.TimeZone) {
		return d
	}

	return ((d instanceof Date && Temporal.TimeZone.from(d.toISOString())) ||
		Temporal.TimeZone.from(d as string)) as Temporal.TimeZone
}
