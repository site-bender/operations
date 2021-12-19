import moreThanN from './mod.ts'
import {
	EqualToNConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: EqualToNConstraint = {
	constraintType: TypeOfConstraint.EQUAL_TO_N,
	operand: 42,
}

Deno.test(
	'[moreThanN] returns correct validation if integer more than constraint value',
	() => {
		const validation: Validation = {
			datatype: 'integer',
			value: 43,
		}

		assertEquals(moreThanN(constraint)(validation), validation)
	},
)

Deno.test(
	'[moreThanN] returns error if integer less than constraint value',
	() => {
		const validation: Validation = {
			datatype: 'integer',
			value: 41,
		}

		assertEquals(moreThanN(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.EQUAL_TO_N,
				},
			],
			isInvalid: true,
		})
	},
)
