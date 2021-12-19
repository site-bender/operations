import afterDate from './mod.ts'
import {
	AfterDateConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: AfterDateConstraint = {
	constraintType: TypeOfConstraint.AFTER_DATE,
	operand: '2001-01-01',
}

Deno.test(
	'[afterDate] returns correct validation if date after constraint value',
	() => {
		const validation: Validation = {
			datatype: 'plainDate',
			value: '2001-09-11',
		}

		assertEquals(afterDate(constraint)(validation), validation)
	},
)

Deno.test('[afterDate] returns error if date before constraint value', () => {
	const validation: Validation = {
		datatype: 'plainDate',
		value: '1999-01-01',
	}

	assertEquals(afterDate(constraint)(validation), {
		...validation,
		errors: [
			{
				constraint,
				error: TypeOfConstraint.AFTER_DATE,
			},
		],
		isInvalid: true,
	})
})

Deno.test('[afterDate] returns error if bad date', () => {
	const validation: Validation = {
		datatype: 'plainDate',
		value: '2001-09-31',
	}

	assertEquals(afterDate(constraint)(validation), {
		...validation,
		errors: [
			{
				constraint,
				error: TypeOfConstraint.AFTER_DATE,
				errorMessage: 'RangeError: value out of range: 1 <= 31 <= 30',
			},
		],
		isInvalid: true,
	})
})
