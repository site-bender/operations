import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	IntegerTypeConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import makeIsInteger from "./mod.ts"

const constraint: IntegerTypeConstraint = {
	constraintType: TypeOfConstraint.IS_INTEGER,
}

Deno.test(
	"[makeIsInteger] returns correct validation when value is an integer",
	() => {
		const validation: Validation = {
			datatype: "integer",
			value: 3,
		}

		assertEquals(makeIsInteger(constraint)(validation), validation)
	},
)

Deno.test("[makeIsInteger] returns error when value is not an integer", () => {
	const validation: Validation = {
		datatype: "integer",
		value: 3.1415,
	}

	assertEquals(makeIsInteger(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_INTEGER,
				constraint,
			},
		],
	})
})
