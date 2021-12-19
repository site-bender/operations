import type {
	FractionTypeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import type { Fraction } from '../../../../types/values.ts'
import makeError from '../../../utilities/makeError/mod.ts'

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
