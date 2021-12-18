import { Temporal } from '@js-temporal/polyfill'
import { DurationOptions } from '../../../types/values'

export default function getDuration(
	value: Temporal.Duration | DurationOptions | string,
): Temporal.Duration {
	if (value instanceof Temporal.Duration) {
		return value
	}

	return Temporal.Duration.from(value)
}
