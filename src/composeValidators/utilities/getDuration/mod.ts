import { Temporal } from 'https://cdn.skypack.dev/@js-temporal/polyfill?dts'
import type { DurationOptions } from '../../../types/values.ts'

export default function getDuration(
	value: Temporal.Duration | DurationOptions | string,
): Temporal.Duration {
	if (value instanceof Temporal.Duration) {
		return value
	}

	return Temporal.Duration.from(value)
}
