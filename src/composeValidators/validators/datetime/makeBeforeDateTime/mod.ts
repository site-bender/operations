import { Temporal } from 'https://cdn.skypack.dev/@js-temporal/polyfill?dts'
import makeOperator from '../../../../makeOperator/mod.ts'
import type {
	BeforeDateTimeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import type { Operation } from '../../../../types/operations.ts'
import getPlainDateTime from '../../../utilities/getPlainDateTime/mod.ts'
import makeError from '../../../utilities/makeError/mod.ts'

export default function makeBeforeDateTime(
	constraint: BeforeDateTimeConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint
	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function beforeDateTime(validation: Validation): Validation {
		const injected = injector()
		const testValue =
			typeof injected === 'object' && 'value' in injected
				? injected.value
				: injected

		try {
			const testDateTime = getPlainDateTime(
				testValue as string | Temporal.PlainDateTime | Date,
			)
			const dateToTest = getPlainDateTime(
				validation.value as string | Temporal.PlainDateTime | Date,
			)

			return Temporal.PlainDateTime.compare(dateToTest, testDateTime) < 0
				? validation
				: makeError(validation, constraint)
		} catch (e) {
			return makeError(validation, constraint, e.toString())
		}
	}
}
