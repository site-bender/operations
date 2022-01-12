import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	DateTypeConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import type { PlainDateValue } from "../../../../types/values.ts"
import makeIsDate from "./mod.ts"

const constraint: DateTypeConstraint = {
	constraintType: TypeOfConstraint.IS_DATE,
}

Deno.test(
	"[makeIsDate] returns correct validation when value is a date",
	() => {
		const validation: Validation = {
			datatype: "plainDate",
			value: "2000-01-01",
		}

		assertEquals(makeIsDate(constraint)(validation), validation)
	},
)

Deno.test("[makeIsDate] returns error when value is not a date", () => {
	const validation: Validation & PlainDateValue = {
		datatype: "plainDate",
		// @ts-ignore: for testing purposes
		value: 666,
	}

	assertEquals(makeIsDate(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_DATE,
				constraint,
				errorMessage: "RangeError: invalid ISO 8601 string: 666",
			},
		],
	})
})
