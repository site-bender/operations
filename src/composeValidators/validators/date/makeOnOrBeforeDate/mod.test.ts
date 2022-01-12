import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	OnOrBeforeDateConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import onOrBeforeDate from "./mod.ts"

const constraint: OnOrBeforeDateConstraint = {
	constraintType: TypeOfConstraint.ON_OR_BEFORE_DATE,
	operand: "2001-01-01",
}

Deno.test(
	"[onOrBeforeDate] returns correct validation if date before constraint value",
	() => {
		const validation: Validation = {
			datatype: "plainDate",
			value: "1999-01-01",
		}

		assertEquals(onOrBeforeDate(constraint)(validation), validation)
	},
)

Deno.test(
	"[onOrBeforeDate] returns correct validation if date equals constraint value",
	() => {
		const validation: Validation = {
			datatype: "plainDate",
			value: "2001-01-01",
		}

		assertEquals(onOrBeforeDate(constraint)(validation), validation)
	},
)

Deno.test(
	"[onOrBeforeDate] returns error if date after constraint value",
	() => {
		const validation: Validation = {
			datatype: "plainDate",
			value: "2001-09-11",
		}

		assertEquals(onOrBeforeDate(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.ON_OR_BEFORE_DATE,
				},
			],
			isInvalid: true,
		})
	},
)

Deno.test("[onOrBeforeDate] returns error if bad date", () => {
	const validation: Validation = {
		datatype: "plainDate",
		value: "2001-09-31",
	}

	assertEquals(onOrBeforeDate(constraint)(validation), {
		...validation,
		errors: [
			{
				constraint,
				error: TypeOfConstraint.ON_OR_BEFORE_DATE,
				errorMessage: "RangeError: value out of range: 1 <= 31 <= 30",
			},
		],
		isInvalid: true,
	})
})
