import beforeAlphabetically from './mod.ts'
import {
	BeforeAlphabeticallyConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: BeforeAlphabeticallyConstraint = {
	constraintType: TypeOfConstraint.BEFORE_ALPHABETICALLY,
	operand: 'bob',
}

Deno.test(
	'[beforeAlphabetically] returns correct validation if value validates against constraint',
	() => {
		const validation: Validation = {
			datatype: 'string',
			value: 'alice',
		}

		assertEquals(beforeAlphabetically(constraint)(validation), validation)
	},
)

Deno.test('[beforeAlphabetically] handles constraint with options', () => {
	const validation: Validation = {
		datatype: 'string',
		value: 'alice',
	}

	assertEquals(
		beforeAlphabetically({
			...constraint,
			language: 'fr',
			options: {
				sensitivity: 'accent',
			},
		})(validation),
		validation,
	)
})

Deno.test('[beforeAlphabetically] returns error if validation fails', () => {
	const validation: Validation = {
		datatype: 'string',
		value: 'carol',
	}

	assertEquals(beforeAlphabetically(constraint)(validation), {
		...validation,
		errors: [
			{
				constraint,
				error: TypeOfConstraint.BEFORE_ALPHABETICALLY,
			},
		],
		isInvalid: true,
	})
})
