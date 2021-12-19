import makeIsMonthDay from './mod.ts'
import {
	MonthDayConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import type { MonthDayValue } from '../../../../types/values.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: MonthDayConstraint = {
	constraintType: TypeOfConstraint.IS_MONTH_DAY,
}

Deno.test(
	'[makeIsMonthDay] returns correct validation when value is a date',
	() => {
		const validation: Validation = {
			datatype: 'monthDay',
			value: '2000-01-01',
		}

		assertEquals(makeIsMonthDay(constraint)(validation), validation)
	},
)

Deno.test('[makeIsMonthDay] returns error when value is not a date', () => {
	const validation: Validation & MonthDayValue = {
		datatype: 'monthDay',
		// @ts-ignore: for testing purposes
		value: 666,
	}

	assertEquals(makeIsMonthDay(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_MONTH_DAY,
				constraint,
				errorMessage: 'RangeError: invalid ISO 8601 string: 666',
			},
		],
	})
})
