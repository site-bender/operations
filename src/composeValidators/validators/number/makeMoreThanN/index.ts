import makeOperator from '../../../../makeOperator'
import type {
	MoreThanNConstraint,
	Validation,
} from '../../../../types/constraints'
import { Operation } from '../../../../types/operations'
import { Fraction, NumberValue } from '../../../../types/values'
import makeError from '../../../utilities/makeError'

export default function makeMoreThanN(
	constraint: MoreThanNConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint
	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function moreThanN(validation: Validation): Validation {
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

		return value > testValue ? validation : makeError(validation, constraint)
	}
}
