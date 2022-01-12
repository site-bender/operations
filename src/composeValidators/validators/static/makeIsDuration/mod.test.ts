import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	DurationTypeConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import type { DurationValue } from "../../../../types/values.ts"
import makeIsDuration from "./mod.ts"

const constraint: DurationTypeConstraint = {
	constraintType: TypeOfConstraint.IS_DURATION,
}

Deno.test(
	"[makeIsDuration] returns correct validation when value is duration options",
	() => {
		const validation: Validation = {
			datatype: "duration",
			value: { days: 3, hours: 7, seconds: 630 },
		}

		assertEquals(makeIsDuration(constraint)(validation), validation)
	},
)

Deno.test(
	"[makeIsDuration] returns correct validation when value is a duration string",
	() => {
		const validation: Validation = {
			datatype: "duration",
			value: "P1Y1D",
		}

		assertEquals(makeIsDuration(constraint)(validation), validation)
	},
)

Deno.test("[makeIsDuration] returns error when value is not a duration", () => {
	const validation: Validation & DurationValue = {
		datatype: "duration",
		// @ts-ignore: for testing purposes
		value: 666,
	}

	assertEquals(makeIsDuration(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_DURATION,
				constraint,
				errorMessage: "RangeError: invalid duration: 666",
			},
		],
	})
})
