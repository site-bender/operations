import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import {
	OrderedListConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import orderedList from "./mod.ts"

const constraint: OrderedListConstraint = {
	constraintType: TypeOfConstraint.ORDERED_LIST,
	operand: "red,yellow,green,cyan,blue,magenta",
}

Deno.test(
	"[orderedList] returns correct validation if list contains the constraint values in the same order",
	() => {
		const validation: Validation = {
			datatype: "list",
			value: "red,green,blue",
		}

		assertEquals(orderedList(constraint)(validation), validation)
	},
)

Deno.test("[orderedList] works with arrays", () => {
	const validation: Validation = {
		datatype: "list",
		value: ["red", "green", "blue"],
	}

	assertEquals(
		orderedList({
			...constraint,
			operand: ["red", "yellow", "green", "cyan", "blue", "magenta"],
		})(validation),
		validation,
	)
})

Deno.test("[orderedList] returns error if list after constraint value", () => {
	const validation: Validation = {
		datatype: "list",
		value: "red,blue,green",
	}

	assertEquals(orderedList(constraint)(validation), {
		...validation,
		errors: [
			{
				constraint,
				error: TypeOfConstraint.ORDERED_LIST,
			},
		],
		isInvalid: true,
	})
})
