import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	Validation,
	YearMonthConstraint,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import type { YearMonthValue } from "../../../../types/values.ts"
import makeIsYearMonth from "./mod.ts"

const constraint: YearMonthConstraint = {
	constraintType: TypeOfConstraint.IS_YEAR_MONTH,
}

Deno.test(
	"[makeIsYearMonth] returns correct validation when value is a date",
	() => {
		const validation: Validation = {
			datatype: "yearMonth",
			value: "2000-01",
		}

		assertEquals(makeIsYearMonth(constraint)(validation), validation)
	},
)

Deno.test("[makeIsYearMonth] returns error when value is not a date", () => {
	const validation: Validation & YearMonthValue = {
		datatype: "yearMonth",
		// @ts-ignore: for testing purposes
		value: 666,
	}

	assertEquals(makeIsYearMonth(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_YEAR_MONTH,
				constraint,
				errorMessage: "RangeError: invalid ISO 8601 string: 666",
			},
		],
	})
})
