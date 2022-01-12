import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	NotAfterAlphabeticallyConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import notAfterAlphabetically from "./mod.ts"

const constraint: NotAfterAlphabeticallyConstraint = {
	constraintType: TypeOfConstraint.NOT_AFTER_ALPHABETICALLY,
	operand: "bob",
}

Deno.test(
	"[notAfterAlphabetically] returns correct validation if string comes before constraint value alphabetically",
	() => {
		const validation: Validation = {
			datatype: "string",
			value: "alice",
		}

		assertEquals(notAfterAlphabetically(constraint)(validation), validation)
	},
)

Deno.test(
	"[notAfterAlphabetically] returns correct validation if string and constraint value are alphabetically equal",
	() => {
		const validation: Validation = {
			datatype: "string",
			value: "BOB",
		}

		assertEquals(
			notAfterAlphabetically({
				...constraint,
				options: {
					sensitivity: "base",
				},
			})(validation),
			validation,
		)
	},
)

Deno.test("[notAfterAlphabetically] handles constraint with options", () => {
	const validation: Validation = {
		datatype: "string",
		value: "alice",
	}

	assertEquals(
		notAfterAlphabetically({
			...constraint,
			language: "fr",
			options: {
				sensitivity: "accent",
			},
		})(validation),
		validation,
	)
})

Deno.test("[notAfterAlphabetically] returns error if validation fails", () => {
	const validation: Validation = {
		datatype: "string",
		value: "carol",
	}

	assertEquals(notAfterAlphabetically(constraint)(validation), {
		...validation,
		errors: [
			{
				constraint,
				error: TypeOfConstraint.NOT_AFTER_ALPHABETICALLY,
			},
		],
		isInvalid: true,
	})
})
