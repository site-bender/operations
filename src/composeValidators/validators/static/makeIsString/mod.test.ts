import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import type {
	StringTypeConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import type { StringValue } from "../../../../types/values.ts"
import makeIsString from "./mod.ts"

const constraint: StringTypeConstraint = {
	constraintType: TypeOfConstraint.IS_STRING,
}

Deno.test(
	"[makeIsString] returns correct validation when value is a string",
	() => {
		const validation: Validation = {
			datatype: "string",
			value: "",
		}

		assertEquals(makeIsString(constraint)(validation), validation)
	},
)

Deno.test("[makeIsString] returns error when value is not a string", () => {
	const validation: Validation & StringValue = {
		datatype: "string",
		// @ts-ignore: for testing purposes
		value: 86,
	}

	assertEquals(makeIsString(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_STRING,
				constraint,
			},
		],
	})
})
