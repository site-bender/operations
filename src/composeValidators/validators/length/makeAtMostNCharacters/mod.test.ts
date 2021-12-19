import atMostNCharacters from './mod.ts'
import {
	AtMostNCharactersConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const validation: Validation = {
	datatype: 'string',
	value: 'Peter Piper picked a peck of pickled peppers.',
}

Deno.test(
	'[atMostNCharacters] returns correct validation if string length less than constraint value',
	() => {
		const constraint: AtMostNCharactersConstraint = {
			constraintType: TypeOfConstraint.AT_MOST_N_CHARACTERS,
			operand: 46,
		}

		assertEquals(atMostNCharacters(constraint)(validation), validation)
	},
)

Deno.test(
	'[atMostNCharacters] returns correct validation if string length equals constraint value',
	() => {
		const constraint: AtMostNCharactersConstraint = {
			constraintType: TypeOfConstraint.AT_MOST_N_CHARACTERS,
			operand: 45,
		}

		assertEquals(atMostNCharacters(constraint)(validation), validation)
	},
)

Deno.test(
	'[atMostNCharacters] returns error if string length less than constraint value',
	() => {
		const constraint: AtMostNCharactersConstraint = {
			constraintType: TypeOfConstraint.AT_MOST_N_CHARACTERS,
			operand: 44,
		}

		assertEquals(atMostNCharacters(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.AT_MOST_N_CHARACTERS,
				},
			],
			isInvalid: true,
		})
	},
)

Deno.test(
	'[atMostNCharacters] returns correct validation if string length equals constraint value using match',
	() => {
		const constraint: AtMostNCharactersConstraint = {
			constraintType: TypeOfConstraint.AT_MOST_N_CHARACTERS,
			operand: 12,
			match: /([pc])/gi,
		}

		assertEquals(atMostNCharacters(constraint)(validation), validation)
	},
)

Deno.test(
	'[atMostNCharacters] returns correct response when match returns null',
	() => {
		const constraint: AtMostNCharactersConstraint = {
			constraintType: TypeOfConstraint.AT_MOST_N_CHARACTERS,
			operand: 12,
			match: /([x])/gi,
		}

		assertEquals(atMostNCharacters(constraint)(validation), validation)
	},
)
