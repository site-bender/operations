import makeIsReal from './mod.ts'
import type {
	RealTypeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import type { RealNumberValue } from '../../../../types/values.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: RealTypeConstraint = {
	constraintType: TypeOfConstraint.IS_REAL,
}

Deno.test(
	'[makeIsReal] returns correct validation when value is a real number',
	() => {
		const validation: Validation = {
			datatype: 'real',
			value: 3.1415,
		}

		assertEquals(makeIsReal(constraint)(validation), validation)
	},
)

Deno.test('[makeIsReal] returns error when value is not a real number', () => {
	const validation: Validation & RealNumberValue = {
		datatype: 'real',
		// @ts-ignore: for testing purposes
		value: '7.7',
	}

	assertEquals(makeIsReal(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_REAL,
				constraint,
			},
		],
	})
})
