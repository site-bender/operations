import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"

export default function getZonedDateTime(
	d: string | Date | Temporal.ZonedDateTime,
): Temporal.ZonedDateTime {
	if (d instanceof Temporal.ZonedDateTime) {
		return d
	}

	if (d instanceof Date) {
		return Temporal.Instant.fromEpochMilliseconds(d.getTime()).toZonedDateTime({
			timeZone: Temporal.Now.timeZone().toString(),
			calendar: "gregory",
		})
	}

	return Temporal.ZonedDateTime.from(d as string)
}
