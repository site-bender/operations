import makeIsFraction from './mod.ts'
import {
	FractionTypeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import type { FractionValue } from '../../../../types/values.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: FractionTypeConstraint = {
	constraintType: TypeOfConstraint.IS_FRACTION,
}

Deno.test(
	'[makeIsFraction] returns correct validation when value is a fraction',
	() => {
		const validation: Validation = {
			datatype: 'fraction',
			value: {
				denominator: 7,
				numerator: 22,
			},
		}

		assertEquals(makeIsFraction(constraint)(validation), validation)
	},
)

Deno.test(
	'[makeIsFraction] returns error when numerator is not a number',
	() => {
		const validation: Validation & FractionValue = {
			datatype: 'fraction',
			value: {
				denominator: 7,
				// @ts-ignore: for testing purposes
				numerator: undefined,
			},
		}

		assertEquals(makeIsFraction(constraint)(validation), {
			...validation,
			isInvalid: true,
			errors: [
				{
					error: TypeOfConstraint.IS_FRACTION,
					constraint,
				},
			],
		})
	},
)

Deno.test(
	'[makeIsFraction] returns error when denominator is not a number',
	() => {
		const validation: Validation & FractionValue = {
			datatype: 'fraction',
			value: {
				// @ts-ignore: for testing purposes
				denominator: undefined,
				numerator: 22,
			},
		}

		assertEquals(makeIsFraction(constraint)(validation), {
			...validation,
			isInvalid: true,
			errors: [
				{
					error: TypeOfConstraint.IS_FRACTION,
					constraint,
				},
			],
		})
	},
)

Deno.test('[makeIsFraction] returns error when denominator is zero', () => {
	const validation: Validation = {
		datatype: 'fraction',
		value: {
			denominator: 0,
			numerator: 22,
		},
	}

	assertEquals(makeIsFraction(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_FRACTION,
				constraint,
			},
		],
	})
})
