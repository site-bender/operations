import reversedList from './mod.ts'
import {
	ReversedListConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: ReversedListConstraint = {
	constraintType: TypeOfConstraint.REVERSED_LIST,
	operand: 'red,yellow,green,cyan,blue,magenta',
}

Deno.test(
	'[reversedList] returns correct validation if list contains the constraint values in the same order',
	() => {
		const validation: Validation = {
			datatype: 'list',
			value: 'blue,green,red',
		}

		assertEquals(reversedList(constraint)(validation), validation)
	},
)

Deno.test('[reversedList] works with arrays', () => {
	const validation: Validation = {
		datatype: 'list',
		value: ['blue', 'green', 'red'],
	}

	assertEquals(
		reversedList({
			...constraint,
			operand: ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'],
		})(validation),
		validation,
	)
})

Deno.test('[reversedList] returns error if list after constraint value', () => {
	const validation: Validation = {
		datatype: 'list',
		value: 'red,blue,green',
	}

	assertEquals(reversedList(constraint)(validation), {
		...validation,
		errors: [
			{
				constraint,
				error: TypeOfConstraint.REVERSED_LIST,
			},
		],
		isInvalid: true,
	})
})
