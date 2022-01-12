import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	Validation,
	ZonedDateTimeTypeConstraint,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import type { ZonedDateTimeValue } from "../../../../types/values.ts"
import makeIsZonedDateTime from "./mod.ts"

const constraint: ZonedDateTimeTypeConstraint = {
	constraintType: TypeOfConstraint.IS_ZONED_DATE_TIME,
}

Deno.test(
	"[makeIsZonedDateTime] returns correct validation when value is a date",
	() => {
		const validation: Validation = {
			datatype: "zonedDateTime",
			value: new Date(),
		}

		assertEquals(makeIsZonedDateTime(constraint)(validation), validation)
	},
)

Deno.test(
	"[makeIsZonedDateTime] returns error when value is not a date",
	() => {
		const validation: Validation & ZonedDateTimeValue = {
			datatype: "zonedDateTime",
			// @ts-ignore: for testing purposes
			value: 666,
		}

		assertEquals(makeIsZonedDateTime(constraint)(validation), {
			...validation,
			isInvalid: true,
			errors: [
				{
					error: TypeOfConstraint.IS_ZONED_DATE_TIME,
					constraint,
					errorMessage: "RangeError: invalid ISO 8601 string: 666",
				},
			],
		})
	},
)
