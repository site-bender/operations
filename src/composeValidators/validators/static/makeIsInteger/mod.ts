import type {
	IntegerTypeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import makeError from '../../../utilities/makeError/mod.ts'

export default function makeIsInteger(
	constraint: IntegerTypeConstraint,
): (validation: Validation) => Validation {
	return function isInteger(validation: Validation): Validation {
		const value = validation.value

		return typeof value === 'number' && Number.isInteger(value)
			? validation
			: makeError(validation, constraint)
	}
}
