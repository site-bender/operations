import { Temporal } from '@js-temporal/polyfill'
import type {
	DurationTypeConstraint,
	Validation,
} from '../../../../types/constraints'
import { DurationOptions, Value } from '../../../../types/values'
import getDuration from '../../../utilities/getDuration'
import makeError from '../../../utilities/makeError'

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
