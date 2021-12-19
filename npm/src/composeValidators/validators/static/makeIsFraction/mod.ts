import type {
	FractionTypeConstraint,
	Validation,
} from '../../../../types/constraints.js'
import type { Fraction } from '../../../../types/values.js'
import makeError from '../../../utilities/makeError/mod.js'

export default function makeIsFraction(
	constraint: FractionTypeConstraint,
): (validation: Validation) => Validation {
	return function isFraction(validation: Validation): Validation {
		const value: Fraction = validation.value as Fraction

		return typeof value === 'object' &&
			Number.isInteger(value.denominator) &&
			value.denominator !== 0 &&
			Number.isInteger(value.numerator)
			? validation
			: makeError(validation, constraint)
	}
}
