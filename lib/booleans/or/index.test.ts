import { right } from "../../fp/either"
import { expect, test } from "vitest"

import or from "."

test("returns a true wrapped in a right when one operation works", async () => {
	const success = or({
		operands: [
			{
				addends: [7, 8, 9],
				operation: "add",
				returns: "number",
			},
			{
				addends: [5, 6],
				operation: "add",
				returns: "number",
			},
			{
				operand: 5,
				operation: "lessThan",
				returns: "number",
				test: 3,
			},
		],
		operation: "or",
		returns: "boolean",
	})()

	expect(success).toEqual(right(true))
})

test("returns false wrapped in a right when all operands fail", async () => {
	const failure = or({
		operands: [
			{
				operand: 5,
				operation: "lessThan",
				returns: "number",
				test: 3,
			},
			{
				operand: 10,
				operation: "moreThan",
				returns: "number",
				test: 5,
			},
		],
		operation: "or",
		returns: "boolean",
	})()

	expect(failure).toEqual(right(false))
})
