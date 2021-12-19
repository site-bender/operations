import { Temporal } from 'https://cdn.skypack.dev/@js-temporal/polyfill?dts'
import type { DurationOptions } from '../../../types/values.ts'

export default function getDuration(
	d: Temporal.Duration | DurationOptions | string,
): Temporal.Duration {
	if (d instanceof Temporal.Duration) {
		return d
	}

	return Temporal.Duration.from(d)
}
