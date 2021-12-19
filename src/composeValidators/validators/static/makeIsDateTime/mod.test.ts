import makeIsDateTime from './mod.ts'
import {
	DateTimeTypeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import type { PlainDateTimeValue } from '../../../../types/values.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: DateTimeTypeConstraint = {
	constraintType: TypeOfConstraint.IS_DATE_TIME,
}

Deno.test(
	'[makeIsDateTime] returns correct validation when value is a date',
	() => {
		const validation: Validation = {
			datatype: 'plainDateTime',
			value: '2000-01-01T00:00:00Z',
		}

		assertEquals(makeIsDateTime(constraint)(validation), validation)
	},
)

Deno.test('[makeIsDateTime] returns error when value is not a date', () => {
	const validation: Validation & PlainDateTimeValue = {
		datatype: 'plainDateTime',
		// @ts-ignore: for testing purposes
		value: 666,
	}

	assertEquals(makeIsDateTime(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_DATE_TIME,
				constraint,
				errorMessage: 'RangeError: invalid ISO 8601 string: 666',
			},
		],
	})
})
