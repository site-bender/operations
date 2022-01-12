import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	TypeOfBooleanConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import type { BooleanValue } from "../../../../types/values.ts"
import makeIsBoolean from "./mod.ts"

const constraint: TypeOfBooleanConstraint = {
	constraintType: TypeOfConstraint.IS_BOOLEAN,
}

Deno.test(
	"[makeIsBoolean] returns correct validation when value is an boolean",
	() => {
		const validation: Validation = {
			datatype: "boolean",
			value: true,
		}

		assertEquals(makeIsBoolean(constraint)(validation), validation)
	},
)

Deno.test("[makeIsBoolean] returns error when value is not an boolean", () => {
	const validation: Validation & BooleanValue = {
		datatype: "boolean",
		// @ts-ignore: for testing purposes
		value: undefined,
	}

	assertEquals(makeIsBoolean(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_BOOLEAN,
				constraint,
			},
		],
	})
})
