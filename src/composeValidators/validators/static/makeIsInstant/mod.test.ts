import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	InstantTypeConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import type { InstantValue } from "../../../../types/values.ts"
import makeIsInstant from "./mod.ts"

const constraint: InstantTypeConstraint = {
	constraintType: TypeOfConstraint.IS_INSTANT,
}

Deno.test(
	"[makeIsInstant] returns correct validation when value is a valid ISO 8601 string",
	() => {
		const validation: Validation = {
			datatype: "instant",
			value: "2019-03-30T01:45:00+01:00[Europe/Berlin]",
		}

		assertEquals(makeIsInstant(constraint)(validation), validation)
	},
)

Deno.test(
	"[makeIsInstant] returns error when value is not a valid ISO 8601 string",
	() => {
		const validation: Validation & InstantValue = {
			datatype: "instant",
			// @ts-ignore: for testing purposes
			value: 666,
		}

		assertEquals(makeIsInstant(constraint)(validation), {
			...validation,
			isInvalid: true,
			errors: [
				{
					error: TypeOfConstraint.IS_INSTANT,
					constraint,
					errorMessage: "RangeError: invalid ISO 8601 string: 666",
				},
			],
		})
	},
)
