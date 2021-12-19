import type {
	DurationTypeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import getDuration from '../../../utilities/getDuration/mod.ts'
import makeError from '../../../utilities/makeError/mod.ts'
import type { DurationValue } from '../../../../types/values.ts'

export default function makeIsDuration(
	constraint: DurationTypeConstraint,
): (validation: Validation) => Validation {
	return function isDuration(validation: Validation): Validation {
		const { value } = validation as DurationValue

		try {
			getDuration(value)

			return validation
		} catch (e) {
			return makeError(validation, constraint, (e as Error).toString())
		}
	}
}
