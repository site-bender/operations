import atMostN from './mod.ts'
import type {
	AtMostNConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: AtMostNConstraint = {
	constraintType: TypeOfConstraint.AT_MOST_N,
	operand: 42,
}

Deno.test(
	'[atMostN] returns correct validation if integer less than constraint value',
	() => {
		const validation: Validation = {
			datatype: 'integer',
			value: 41,
		}

		assertEquals(atMostN(constraint)(validation), validation)
	},
)

Deno.test(
	'[atMostN] returns correct validation if integer equals constraint value',
	() => {
		const validation: Validation = {
			datatype: 'integer',
			value: 42,
		}

		assertEquals(atMostN(constraint)(validation), validation)
	},
)

Deno.test(
	'[atMostN] returns error if integer more than constraint value',
	() => {
		const validation: Validation = {
			datatype: 'integer',
			value: 43,
		}

		assertEquals(atMostN(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.AT_MOST_N,
				},
			],
			isInvalid: true,
		})
	},
)
