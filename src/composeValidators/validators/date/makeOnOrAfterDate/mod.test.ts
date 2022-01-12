import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	OnOrAfterDateConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import onOrAfterDate from "./mod.ts"

const constraint: OnOrAfterDateConstraint = {
	constraintType: TypeOfConstraint.ON_OR_AFTER_DATE,
	operand: "2001-01-01",
}

Deno.test(
	"[onOrAfterDate] returns correct validation if date after constraint value",
	() => {
		const validation: Validation = {
			datatype: "plainDate",
			value: "2001-09-11",
		}

		assertEquals(onOrAfterDate(constraint)(validation), validation)
	},
)

Deno.test(
	"[onOrAfterDate] returns correct validation if date equals constraint value",
	() => {
		const validation: Validation = {
			datatype: "plainDate",
			value: "2001-01-01",
		}

		assertEquals(onOrAfterDate(constraint)(validation), validation)
	},
)

Deno.test(
	"[onOrAfterDate] returns error if date before constraint value",
	() => {
		const validation: Validation = {
			datatype: "plainDate",
			value: "1999-01-01",
		}

		assertEquals(onOrAfterDate(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.ON_OR_AFTER_DATE,
				},
			],
			isInvalid: true,
		})
	},
)

Deno.test("[onOrAfterDate] returns error if bad date", () => {
	const validation: Validation = {
		datatype: "plainDate",
		value: "2001-09-31",
	}

	assertEquals(onOrAfterDate(constraint)(validation), {
		...validation,
		errors: [
			{
				constraint,
				error: TypeOfConstraint.ON_OR_AFTER_DATE,
				errorMessage: "RangeError: value out of range: 1 <= 31 <= 30",
			},
		],
		isInvalid: true,
	})
})
