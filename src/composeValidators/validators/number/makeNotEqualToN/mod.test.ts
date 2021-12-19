import notEqualToN from './mod.ts'
import {
	NotEqualToNConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: NotEqualToNConstraint = {
	constraintType: TypeOfConstraint.NOT_EQUAL_TO_N,
	operand: 42,
}

Deno.test(
	'[moreThanN] returns correct validation if integer more than constraint value',
	() => {
		const validation: Validation = {
			datatype: 'integer',
			value: 43,
		}

		assertEquals(notEqualToN(constraint)(validation), validation)
	},
)

Deno.test(
	'[notEqualToN] returns error if integer less than constraint value',
	() => {
		const validation: Validation = {
			datatype: 'integer',
			value: 41,
		}

		assertEquals(notEqualToN(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.NOT_EQUAL_TO_N,
				},
			],
			isInvalid: true,
		})
	},
)
