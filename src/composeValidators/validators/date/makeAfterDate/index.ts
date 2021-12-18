import { Temporal } from '@js-temporal/polyfill'
import makeOperator from '../../../../makeOperator'
import type {
	AfterDateConstraint,
	Validation,
} from '../../../../types/constraints'
import { Operation } from '../../../../types/operations'
import getPlainDate from '../../../utilities/getPlainDate'
import makeError from '../../../utilities/makeError'

export default function makeAfterDate(
	constraint: AfterDateConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint
	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function afterDate(validation: Validation): Validation {
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

			return Temporal.PlainDate.compare(dateToTest, testDate) > 0
				? validation
				: makeError(validation, constraint)
		} catch (e) {
			return makeError(validation, constraint, e.toString())
		}
	}
}
