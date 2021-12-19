import type {
	RealTypeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import not from '../../../../utilities/not/mod.ts'
import makeError from '../../../utilities/makeError/mod.ts'

export default function makeIsReal(
	constraint: RealTypeConstraint,
): (validation: Validation) => Validation {
	return function isReal(validation: Validation): Validation {
		const value = validation.value

		return typeof value === 'number' && not(Number.isNaN(value))
			? validation
			: makeError(validation, constraint)
	}
}
