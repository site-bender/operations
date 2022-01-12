import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	TimeZoneTypeConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import type { TimeZoneValue } from "../../../../types/values.ts"
import makeIsTimeZone from "./mod.ts"

const constraint: TimeZoneTypeConstraint = {
	constraintType: TypeOfConstraint.IS_TIME_ZONE,
}

Deno.test(
	"[makeIsTimeZone] returns correct validation when value is a date",
	() => {
		const validation: Validation = {
			datatype: "timeZone",
			value: "Africa/Cairo",
		}

		assertEquals(makeIsTimeZone(constraint)(validation), validation)
	},
)

Deno.test("[makeIsTimeZone] returns error when value is not a date", () => {
	const validation: Validation & TimeZoneValue = {
		datatype: "timeZone",
		value: "NZT",
	}

	assertEquals(makeIsTimeZone(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_TIME_ZONE,
				constraint,
				errorMessage: "RangeError: Invalid time zone: NZT",
			},
		],
	})
})
