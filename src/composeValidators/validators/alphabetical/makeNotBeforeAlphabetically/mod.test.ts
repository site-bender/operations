import notBeforeAlphabetically from './mod.ts'
import {
	NotBeforeAlphabeticallyConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: NotBeforeAlphabeticallyConstraint = {
	constraintType: TypeOfConstraint.NOT_BEFORE_ALPHABETICALLY,
	operand: 'bob',
}

Deno.test(
	'[notBeforeAlphabetically] returns correct validation if string comes before constraint value alphabetically',
	() => {
		const validation: Validation = {
			datatype: 'string',
			value: 'carol',
		}

		assertEquals(notBeforeAlphabetically(constraint)(validation), validation)
	},
)

Deno.test(
	'[notBeforeAlphabetically] returns correct validation if string and constraint value are alphabetically equal',
	() => {
		const validation: Validation = {
			datatype: 'string',
			value: 'BOB',
		}

		assertEquals(
			notBeforeAlphabetically({
				...constraint,
				options: {
					sensitivity: 'base',
				},
			})(validation),
			validation,
		)
	},
)

Deno.test('[notBeforeAlphabetically] handles constraint with options', () => {
	const validation: Validation = {
		datatype: 'string',
		value: 'carol',
	}

	assertEquals(
		notBeforeAlphabetically({
			...constraint,
			language: 'fr',
			options: {
				sensitivity: 'accent',
			},
		})(validation),
		validation,
	)
})

Deno.test('[notBeforeAlphabetically] returns error if validation fails', () => {
	const validation: Validation = {
		datatype: 'string',
		value: 'alice',
	}

	assertEquals(notBeforeAlphabetically(constraint)(validation), {
		...validation,
		errors: [
			{
				constraint,
				error: TypeOfConstraint.NOT_BEFORE_ALPHABETICALLY,
			},
		],
		isInvalid: true,
	})
})
