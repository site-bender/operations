import lessThanN from './mod.ts'
import {
	LessThanNConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: LessThanNConstraint = {
	constraintType: TypeOfConstraint.LESS_THAN_N,
	operand: 42,
}

Deno.test(
	'[lessThanN] returns correct validation if integer less than constraint value',
	() => {
		const validation: Validation = {
			datatype: 'integer',
			value: 41,
		}

		assertEquals(lessThanN(constraint)(validation), validation)
	},
)

Deno.test(
	'[lessThanN] returns error if integer more than constraint value',
	() => {
		const validation: Validation = {
			datatype: 'integer',
			value: 43,
		}

		assertEquals(lessThanN(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.LESS_THAN_N,
				},
			],
			isInvalid: true,
		})
	},
)
