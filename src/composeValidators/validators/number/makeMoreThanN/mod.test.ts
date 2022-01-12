import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	MoreThanNConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import moreThanN from "./mod.ts"

const constraint: MoreThanNConstraint = {
	constraintType: TypeOfConstraint.MORE_THAN_N,
	operand: 42,
}

Deno.test(
	"[moreThanN] returns correct validation if integer more than constraint value",
	() => {
		const validation: Validation = {
			datatype: "integer",
			value: 43,
		}

		assertEquals(moreThanN(constraint)(validation), validation)
	},
)

Deno.test(
	"[moreThanN] returns error if integer less than constraint value",
	() => {
		const validation: Validation = {
			datatype: "integer",
			value: 41,
		}

		assertEquals(moreThanN(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.MORE_THAN_N,
				},
			],
			isInvalid: true,
		})
	},
)
