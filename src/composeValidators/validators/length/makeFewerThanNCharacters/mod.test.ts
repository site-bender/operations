import fewerThanNCharacters from './mod.ts'
import {
	FewerThanNCharactersConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const validation: Validation = {
	datatype: 'string',
	value: 'Peter Piper picked a peck of pickled peppers.',
}

Deno.test(
	'[fewerThanNCharacters] returns correct validation if string length less than constraint value',
	() => {
		const constraint: FewerThanNCharactersConstraint = {
			constraintType: TypeOfConstraint.FEWER_THAN_N_CHARACTERS,
			operand: 46,
		}

		assertEquals(fewerThanNCharacters(constraint)(validation), validation)
	},
)

Deno.test(
	'[fewerThanNCharacters] returns error if string length equals constraint value',
	() => {
		const constraint: FewerThanNCharactersConstraint = {
			constraintType: TypeOfConstraint.FEWER_THAN_N_CHARACTERS,
			operand: 45,
		}

		assertEquals(fewerThanNCharacters(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.FEWER_THAN_N_CHARACTERS,
				},
			],
			isInvalid: true,
		})
	},
)

Deno.test(
	'[fewerThanNCharacters] returns error if string length more than constraint value',
	() => {
		const constraint: FewerThanNCharactersConstraint = {
			constraintType: TypeOfConstraint.FEWER_THAN_N_CHARACTERS,
			operand: 44,
		}

		assertEquals(fewerThanNCharacters(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.FEWER_THAN_N_CHARACTERS,
				},
			],
			isInvalid: true,
		})
	},
)

Deno.test(
	'[fewerThanNCharacters] returns correct validation if string length less than constraint value using match',
	() => {
		const constraint: FewerThanNCharactersConstraint = {
			constraintType: TypeOfConstraint.FEWER_THAN_N_CHARACTERS,
			operand: 13,
			match: /([pc])/gi,
		}

		assertEquals(fewerThanNCharacters(constraint)(validation), validation)
	},
)

Deno.test(
	'[fewerThanNCharacters] returns correct response when match returns null',
	() => {
		const constraint: FewerThanNCharactersConstraint = {
			constraintType: TypeOfConstraint.FEWER_THAN_N_CHARACTERS,
			operand: 13,
			match: /([x])/gi,
		}

		assertEquals(fewerThanNCharacters(constraint)(validation), validation)
	},
)
