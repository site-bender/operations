import makeIsPrecision from './mod.ts'
import {
	PrecisionTypeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: PrecisionTypeConstraint = {
	constraintType: TypeOfConstraint.IS_PRECISION,
	decimalPlaces: 4,
}

const validation: Validation = {
	datatype: 'precision',
	value: 3.1415,
	decimalPlaces: 4,
}

Deno.test(
	'[makeIsPrecision] returns correct validation when value is a correct precision number',
	() => {
		assertEquals(makeIsPrecision(constraint)(validation), validation)
	},
)

Deno.test('[makeIsPrecision] defaults precision to zero', () => {
	assertEquals(
		makeIsPrecision({
			...constraint,
			// @ts-ignore: for testing purposes
			decimalPlaces: undefined,
		})(validation),
		{
			...validation,
			isInvalid: true,
			errors: [
				{
					error: TypeOfConstraint.IS_PRECISION,
					constraint: {
						...constraint,
						decimalPlaces: undefined,
					},
				},
			],
		},
	)
})

Deno.test(
	'[makeIsPrecision] returns correct validation when value is a correct precision number',
	() => {
		assertEquals(makeIsPrecision(constraint)(validation), validation)
	},
)

Deno.test(
	'[makeIsPrecision] returns error when value is not a precision number but should be',
	() => {
		assertEquals(
			makeIsPrecision({
				...constraint,
				decimalPlaces: 3,
			})(validation),
			{
				...validation,
				isInvalid: true,
				errors: [
					{
						error: TypeOfConstraint.IS_PRECISION,
						constraint: {
							...constraint,
							decimalPlaces: 3,
						},
					},
				],
			},
		)
	},
)
