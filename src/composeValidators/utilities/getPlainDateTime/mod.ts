import { Temporal } from 'https://cdn.skypack.dev/@js-temporal/polyfill?dts'

export default function getPlainDateTime(
	d: string | Date | Temporal.PlainDateTime,
): Temporal.PlainDateTime {
	if (d instanceof Temporal.PlainDateTime) {
		return d
	}

	return (
		(d instanceof Date && Temporal.PlainDateTime.from(d.toISOString())) ||
		Temporal.PlainDateTime.from(d as string)
	)
}
