import { Temporal } from '@js-temporal/polyfill'
import type {
	MonthDayConstraint,
	Validation,
} from '../../../../types/constraints.js'
import getMonthDay from '../../../utilities/getMonthDay/mod.js'
import makeError from '../../../utilities/makeError/mod.js'

// FIXME
export default function makeIsMonthDay(
	constraint: MonthDayConstraint,
): (validation: Validation) => Validation {
	return function isMonthDay(validation: Validation): Validation {
		const value = validation.value

		try {
			getMonthDay(value as string | Temporal.PlainMonthDay | Date)

			return validation
		} catch (e) {
			return makeError(validation, constraint, (e as Error).toString())
		}
	}
}
