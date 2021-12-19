import { Temporal } from '@js-temporal/polyfill'
import makeOperator from '../../../../makeOperator/mod.js'
import type {
	BeforeDateConstraint,
	Validation,
} from '../../../../types/constraints.js'
import { Operation } from '../../../../types/operations.js'
import getPlainDate from '../../../utilities/getPlainDate/mod.js'
import makeError from '../../../utilities/makeError/mod.js'

export default function makeBeforeDate(
	constraint: BeforeDateConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint
	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function beforeDate(validation: Validation): Validation {
		const injected = injector()
		const testValue =
			typeof injected === 'object' && 'value' in injected
				? injected.value
				: injected

		try {
			const testDate = getPlainDate(
				testValue as string | Date | Temporal.PlainDate,
			)
			const dateToTest = getPlainDate(
				validation.value as string | Temporal.PlainDate | Date,
			)

			return Temporal.PlainDate.compare(dateToTest, testDate) < 0
				? validation
				: makeError(validation, constraint)
		} catch (e) {
			return makeError(validation, constraint, e.toString())
		}
	}
}
