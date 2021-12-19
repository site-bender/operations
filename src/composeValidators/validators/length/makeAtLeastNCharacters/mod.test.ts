import atLeastNCharacters from './mod.ts'
import {
	AtLeastNCharactersConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const validation: Validation = {
	datatype: 'string',
	value: 'Peter Piper picked a peck of pickled peppers.',
}

Deno.test(
	'[atLeastNCharacters] returns correct validation if string length more than constraint value',
	() => {
		const constraint: AtLeastNCharactersConstraint = {
			constraintType: TypeOfConstraint.AT_LEAST_N_CHARACTERS,
			operand: 44,
		}

		assertEquals(atLeastNCharacters(constraint)(validation), validation)
	},
)

Deno.test(
	'[atLeastNCharacters] returns correct validation if string length equals constraint value',
	() => {
		const constraint: AtLeastNCharactersConstraint = {
			constraintType: TypeOfConstraint.AT_LEAST_N_CHARACTERS,
			operand: 45,
		}

		assertEquals(atLeastNCharacters(constraint)(validation), validation)
	},
)

Deno.test(
	'[atLeastNCharacters] returns error if string length less than constraint value',
	() => {
		const constraint: AtLeastNCharactersConstraint = {
			constraintType: TypeOfConstraint.AT_LEAST_N_CHARACTERS,
			operand: 46,
		}

		assertEquals(atLeastNCharacters(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.AT_LEAST_N_CHARACTERS,
				},
			],
			isInvalid: true,
		})
	},
)

Deno.test(
	'[atLeastNCharacters] returns correct validation if string length equals constraint value using match',
	() => {
		const constraint: AtLeastNCharactersConstraint = {
			constraintType: TypeOfConstraint.AT_LEAST_N_CHARACTERS,
			operand: 12,
			match: /([pc])/gi,
		}

		assertEquals(atLeastNCharacters(constraint)(validation), validation)
	},
)

Deno.test(
	'[atLeastNCharacters] returns correct response when match returns null',
	() => {
		const constraint: AtLeastNCharactersConstraint = {
			constraintType: TypeOfConstraint.AT_LEAST_N_CHARACTERS,
			operand: 12,
			match: /([x])/gi,
		}

		assertEquals(atLeastNCharacters(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.AT_LEAST_N_CHARACTERS,
				},
			],
			isInvalid: true,
		})
	},
)
