import makeOperator from '../../../../makeOperator/mod.js'
import type {
	EqualToNConstraint,
	Validation,
} from '../../../../types/constraints.js'
import { Operation } from '../../../../types/operations.js'
import { Fraction, NumberValue } from '../../../../types/values.js'
import makeError from '../../../utilities/makeError/mod.js'

export default function makeEqualToN(
	constraint: EqualToNConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint
	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function equalToN(validation: Validation): Validation {
		const injected = injector() as NumberValue | number
		const testValue: number =
			typeof injected === 'number'
				? injected
				: typeof injected.value === 'number'
				? injected.value
				: (injected.value as Fraction).numerator /
				  (injected.value as Fraction).denominator
		const value: number =
			typeof validation.value === 'number'
				? validation.value
				: (validation.value as Fraction).numerator /
				  (validation.value as Fraction).denominator

		return value === testValue ? validation : makeError(validation, constraint)
	}
}
