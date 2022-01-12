import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	BeforeDateConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import beforeDate from "./mod.ts"

const constraint: BeforeDateConstraint = {
	constraintType: TypeOfConstraint.BEFORE_DATE,
	operand: "2001-01-01",
}

Deno.test(
	"[beforeDate] returns correct validation if date before constraint value",
	() => {
		const validation: Validation = {
			datatype: "plainDate",
			value: "1999-01-01",
		}

		assertEquals(beforeDate(constraint)(validation), validation)
	},
)

Deno.test("[beforeDate] returns error if date after constraint value", () => {
	const validation: Validation = {
		datatype: "plainDate",
		value: "2001-09-11",
	}

	assertEquals(beforeDate(constraint)(validation), {
		...validation,
		errors: [
			{
				constraint,
				error: TypeOfConstraint.BEFORE_DATE,
			},
		],
		isInvalid: true,
	})
})

Deno.test("[beforeDate] returns error if bad date", () => {
	const validation: Validation = {
		datatype: "plainDate",
		value: "2001-09-31",
	}

	assertEquals(beforeDate(constraint)(validation), {
		...validation,
		errors: [
			{
				constraint,
				error: TypeOfConstraint.BEFORE_DATE,
				errorMessage: "RangeError: value out of range: 1 <= 31 <= 30",
			},
		],
		isInvalid: true,
	})
})
