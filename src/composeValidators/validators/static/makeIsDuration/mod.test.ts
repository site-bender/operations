import makeIsDuration from './mod.ts'
import {
	DurationTypeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import type { DurationValue } from '../../../../types/values.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: DurationTypeConstraint = {
	constraintType: TypeOfConstraint.IS_DURATION,
}

Deno.test(
	'[makeIsDuration] returns correct validation when value is a date',
	() => {
		const validation: Validation = {
			datatype: 'duration',
			value: '2000-01-01',
		}

		assertEquals(makeIsDuration(constraint)(validation), validation)
	},
)

Deno.test('[makeIsDuration] returns error when value is not a date', () => {
	const validation: Validation & DurationValue = {
		datatype: 'duration',
		// @ts-ignore: for testing purposes
		value: 666,
	}

	assertEquals(makeIsDuration(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_DURATION,
				constraint,
				errorMessage: 'RangeError: invalid ISO 8601 string: 666',
			},
		],
	})
})
