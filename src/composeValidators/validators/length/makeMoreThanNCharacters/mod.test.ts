import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	MoreThanNCharactersConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import moreThanNCharacters from "./mod.ts"

const validation: Validation = {
	datatype: "string",
	value: "Peter Piper picked a peck of pickled peppers.",
}

Deno.test(
	"[moreThanNCharacters] returns correct validation if string length more than constraint value",
	() => {
		const constraint: MoreThanNCharactersConstraint = {
			constraintType: TypeOfConstraint.MORE_THAN_N_CHARACTERS,
			operand: 44,
		}

		assertEquals(moreThanNCharacters(constraint)(validation), validation)
	},
)

Deno.test(
	"[moreThanNCharacters] returns error if string length equals constraint value",
	() => {
		const constraint: MoreThanNCharactersConstraint = {
			constraintType: TypeOfConstraint.MORE_THAN_N_CHARACTERS,
			operand: 45,
		}

		assertEquals(moreThanNCharacters(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.MORE_THAN_N_CHARACTERS,
				},
			],
			isInvalid: true,
		})
	},
)

Deno.test(
	"[moreThanNCharacters] returns error if string length less than constraint value",
	() => {
		const constraint: MoreThanNCharactersConstraint = {
			constraintType: TypeOfConstraint.MORE_THAN_N_CHARACTERS,
			operand: 46,
		}

		assertEquals(moreThanNCharacters(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.MORE_THAN_N_CHARACTERS,
				},
			],
			isInvalid: true,
		})
	},
)

Deno.test(
	"[moreThanNCharacters] returns correct validation if string length less than constraint value using match",
	() => {
		const constraint: MoreThanNCharactersConstraint = {
			constraintType: TypeOfConstraint.MORE_THAN_N_CHARACTERS,
			operand: 11,
			match: /([pc])/gi,
		}

		assertEquals(moreThanNCharacters(constraint)(validation), validation)
	},
)

Deno.test(
	"[moreThanNCharacters] returns correct response when match returns null",
	() => {
		const constraint: MoreThanNCharactersConstraint = {
			constraintType: TypeOfConstraint.MORE_THAN_N_CHARACTERS,
			operand: 11,
			match: /([x])/gi,
		}

		assertEquals(moreThanNCharacters(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.MORE_THAN_N_CHARACTERS,
				},
			],
			isInvalid: true,
		})
	},
)
