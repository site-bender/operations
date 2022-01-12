import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import type {
	ConfirmationConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import confirmed from "./mod.ts"

const constraint: ConfirmationConstraint = {
	constraintType: TypeOfConstraint.CONFIRMED,
}

Deno.test(
	"[confirmed] returns correct validation when the value is true",
	() => {
		const validation: Validation = {
			datatype: "boolean",
			value: true,
		}
		assertEquals(confirmed(constraint)(validation), validation)
	},
)

Deno.test("[confirmed] returns error when the value is not true", () => {
	const validation: Validation = {
		datatype: "boolean",
		value: false,
	}
	assertEquals(confirmed(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.CONFIRMED,
				constraint,
			},
		],
	})
})
