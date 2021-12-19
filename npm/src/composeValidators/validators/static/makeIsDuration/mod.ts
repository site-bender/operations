import { Temporal } from '@js-temporal/polyfill'
import type {
	DurationTypeConstraint,
	Validation,
} from '../../../../types/constraints.js'
import { DurationOptions, Value } from '../../../../types/values.js'
import getDuration from '../../../utilities/getDuration/mod.js'
import makeError from '../../../utilities/makeError/mod.js'

export default function makeIsDuration(
	constraint: DurationTypeConstraint,
): (validation: Validation) => Validation {
	return function isDuration(validation: Validation): Validation {
		const value =
			typeof validation?.value === 'object' &&
			'value' in (validation.value as Value)
				? (validation.value as Value).value
				: validation.value

		try {
			getDuration(value as Temporal.Duration | DurationOptions | string)

			return validation
		} catch (e) {
			return makeError(validation, constraint, (e as Error).toString())
		}
	}
}
