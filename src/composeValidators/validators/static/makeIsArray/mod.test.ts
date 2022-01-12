import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	ArrayTypeConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import makeIsArray from "./mod.ts"

const constraint: ArrayTypeConstraint = {
	constraintType: TypeOfConstraint.IS_ARRAY,
	datatype: "array",
}

Deno.test(
	"[makeIsArray] returns correct validation when value is an array",
	() => {
		const validation: Validation = {
			datatype: "array",
			value: [],
		}

		assertEquals(makeIsArray(constraint)(validation), validation)
	},
)

Deno.test("[makeIsArray] returns error when value is not an array", () => {
	// @ts-ignore: for testing purposes
	const validation: Validation = {
		datatype: "array",
		value: undefined,
	}

	assertEquals(makeIsArray(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_ARRAY,
				constraint,
			},
		],
	})
})
