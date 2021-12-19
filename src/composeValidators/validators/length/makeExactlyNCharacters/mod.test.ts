import exactlyNCharacters from './mod.ts'
import {
	ExactlyNCharactersConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const validation: Validation = {
	datatype: 'string',
	value: 'Peter Piper picked a peck of pickled peppers.',
}

Deno.test(
	'[exactlyNCharacters] returns error if string length less than constraint value',
	() => {
		const constraint: ExactlyNCharactersConstraint = {
			constraintType: TypeOfConstraint.EXACTLY_N_CHARACTERS,
			operand: 46,
		}

		assertEquals(exactlyNCharacters(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.EXACTLY_N_CHARACTERS,
				},
			],
			isInvalid: true,
		})
	},
)

Deno.test(
	'[exactlyNCharacters] returns correct validation if string length equals constraint value',
	() => {
		const constraint: ExactlyNCharactersConstraint = {
			constraintType: TypeOfConstraint.EXACTLY_N_CHARACTERS,
			operand: 45,
		}

		assertEquals(exactlyNCharacters(constraint)(validation), validation)
	},
)

Deno.test(
	'[exactlyNCharacters] returns error if string length more than constraint value',
	() => {
		const constraint: ExactlyNCharactersConstraint = {
			constraintType: TypeOfConstraint.EXACTLY_N_CHARACTERS,
			operand: 44,
		}

		assertEquals(exactlyNCharacters(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.EXACTLY_N_CHARACTERS,
				},
			],
			isInvalid: true,
		})
	},
)

Deno.test(
	'[exactlyNCharacters] returns correct validation if string length equal to constraint value using match',
	() => {
		const constraint: ExactlyNCharactersConstraint = {
			constraintType: TypeOfConstraint.EXACTLY_N_CHARACTERS,
			operand: 12,
			match: /([pc])/gi,
		}

		assertEquals(exactlyNCharacters(constraint)(validation), validation)
	},
)

Deno.test(
	'[exactlyNCharacters] returns correct response when match returns null',
	() => {
		const constraint: ExactlyNCharactersConstraint = {
			constraintType: TypeOfConstraint.EXACTLY_N_CHARACTERS,
			operand: 13,
			match: /([x])/gi,
		}

		assertEquals(exactlyNCharacters(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.EXACTLY_N_CHARACTERS,
				},
			],
			isInvalid: true,
		})
	},
)
