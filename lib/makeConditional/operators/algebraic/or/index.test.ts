import { right } from "@sitebender/fp/lib/either"
import { expect, test } from "vitest"

import or from "."
import makeNumericConstant from "../../../../constants/numericConstant"

test("returns a true wrapped in a right when one operation works", async () => {
	const success = or({
		operands: [
			{
				_tag: "numeric-operation",
				addends: [7, 8, 9].map(makeNumericConstant),
				operation: "add",
			},
			{
				_tag: "numeric-operation",
				addends: [5, 6].map(makeNumericConstant),
				operation: "add",
			},
			{
				operand: makeNumericConstant(5),
				operation: "lessThan",
				returns: "boolean",
				test: makeNumericConstant(3),
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
				operand: makeNumericConstant(5),
				operation: "lessThan",
				returns: "boolean",
				test: makeNumericConstant(3),
			},
			{
				operand: makeNumericConstant(10),
				operation: "moreThan",
				returns: "boolean",
				test: makeNumericConstant(5),
			},
		],
		operation: "or",
		returns: "boolean",
	})()

	expect(failure).toEqual(right(false))
})
