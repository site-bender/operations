import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	EqualToNConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import equalToN from "./mod.ts"

const constraint: EqualToNConstraint = {
	constraintType: TypeOfConstraint.EQUAL_TO_N,
	operand: 42,
}

Deno.test(
	"[equalToN] returns correct validation if integer equal to constraint value",
	() => {
		const validation: Validation = {
			datatype: "integer",
			value: 42,
		}

		assertEquals(equalToN(constraint)(validation), validation)
	},
)

Deno.test(
	"[equalToN] returns error if integer less than constraint value",
	() => {
		const validation: Validation = {
			datatype: "integer",
			value: 41,
		}

		assertEquals(equalToN(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.EQUAL_TO_N,
				},
			],
			isInvalid: true,
		})
	},
)
