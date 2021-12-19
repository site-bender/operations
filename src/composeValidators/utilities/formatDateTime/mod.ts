import type { Temporal } from 'https://cdn.skypack.dev/@js-temporal/polyfill?dts'
import getPlainDateTime from '../getPlainDateTime/mod.ts'

export default function formatDateTime(
	dateTime: Temporal.PlainDateTime | Date | string,
): string {
	return getPlainDateTime(dateTime).toLocaleString('en-NZ', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	})
}
