import { Temporal } from 'https://cdn.skypack.dev/@js-temporal/polyfill?dts'

export default function getInstant(
	d: Temporal.Instant | string | Date,
	timeZone: Temporal.TimeZone | string = 'UTC',
	calendar: Temporal.Calendar | string = 'iso8601',
): Temporal.Instant {
	if (d instanceof Temporal.Instant) {
		return timeZone ? d.toZonedDateTime({ calendar, timeZone }).toInstant() : d
	}

	return d instanceof Date
		? Temporal.Instant.from(d.toISOString())
		: Temporal.Instant.from(d)
}
