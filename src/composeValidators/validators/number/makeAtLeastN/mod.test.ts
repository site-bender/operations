import atLeastN from './mod.ts'
import {
	AtLeastNConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: AtLeastNConstraint = {
	constraintType: TypeOfConstraint.AT_LEAST_N,
	operand: 42,
}

Deno.test(
	'[atLeastN] returns correct validation if integer more than constraint value',
	() => {
		const validation: Validation = {
			datatype: 'integer',
			value: 43,
		}

		assertEquals(atLeastN(constraint)(validation), validation)
	},
)

Deno.test(
	'[atLeastN] returns correct validation if integer equals constraint value',
	() => {
		const validation: Validation = {
			datatype: 'integer',
			value: 42,
		}

		assertEquals(atLeastN(constraint)(validation), validation)
	},
)

Deno.test(
	'[atLeastN] returns error if integer less than constraint value',
	() => {
		const validation: Validation = {
			datatype: 'integer',
			value: 41,
		}

		assertEquals(atLeastN(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.AT_LEAST_N,
				},
			],
			isInvalid: true,
		})
	},
)
