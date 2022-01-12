import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import type {
	MatchConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import matches from "./mod.ts"

const constraint: MatchConstraint = {
	constraintType: TypeOfConstraint.MATCHING,
	operand: "^\\d+$",
}

Deno.test(
	"[matches] returns correct validation when value matches constraint regexp",
	() => {
		const validation: Validation = {
			datatype: "string",
			value: "666",
		}

		assertEquals(matches(constraint)(validation), validation)
	},
)

Deno.test(
	"[matches] returns error when value does not match constraint regexp",
	() => {
		const validation: Validation = {
			datatype: "string",
			value: "xyz",
		}

		assertEquals(matches(constraint)(validation), {
			...validation,
			isInvalid: true,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.MATCHING,
				},
			],
		})
	},
)

Deno.test("[matches] works with flags", () => {
	const validation: Validation = {
		datatype: "string",
		value: "xyz",
	}

	assertEquals(
		matches({
			...constraint,
			operand: "^[A-Z]+$",
			flags: "i",
		})(validation),
		validation,
	)
})
