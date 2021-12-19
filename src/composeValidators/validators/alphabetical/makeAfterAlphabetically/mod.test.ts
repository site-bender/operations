import afterAlphabetically from './mod.ts'
import {
	AfterAlphabeticallyConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: AfterAlphabeticallyConstraint = {
	constraintType: TypeOfConstraint.AFTER_ALPHABETICALLY,
	operand: 'bob',
}

Deno.test(
	'[afterAlphabetically] returns correct validation if string comes after constraint value alphabetically',
	() => {
		const validation: Validation = {
			datatype: 'string',
			value: 'carol',
		}

		assertEquals(afterAlphabetically(constraint)(validation), validation)
	},
)

Deno.test('[afterAlphabetically] handles constraint with options', () => {
	const validation: Validation = {
		datatype: 'string',
		value: 'carol',
	}

	assertEquals(
		afterAlphabetically({
			...constraint,
			language: 'fr',
			options: {
				sensitivity: 'accent',
			},
		})(validation),
		validation,
	)
})

Deno.test('[afterAlphabetically] returns error if validation fails', () => {
	const validation: Validation = {
		datatype: 'string',
		value: 'alice',
	}

	assertEquals(afterAlphabetically(constraint)(validation), {
		...validation,
		errors: [
			{
				constraint,
				error: TypeOfConstraint.AFTER_ALPHABETICALLY,
			},
		],
		isInvalid: true,
	})
})
