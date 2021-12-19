import type {
	RealTypeConstraint,
	Validation,
} from '../../../../types/constraints.js'
import not from '../../../../utilities/not/mod.js'
import makeError from '../../../utilities/makeError/mod.js'

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
