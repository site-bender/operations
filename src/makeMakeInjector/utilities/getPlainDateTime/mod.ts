import { Temporal } from 'https://cdn.skypack.dev/@js-temporal/polyfill?dts'

export default function getPlainDateTime(
	d: Temporal.PlainDateTime | string | Date,
): Temporal.PlainDateTime {
	if (d instanceof Temporal.PlainDateTime) {
		return d
	}

	const dateTime =
		(d instanceof Date && Temporal.PlainDateTime.from(d.toISOString())) ||
		Temporal.PlainDateTime.from(d as string)

	return dateTime
}
