import { Left, Right, isLeft } from "@sitebender/fp/lib/either"
import { expect, test } from "vitest"

import and from "."
import makeNumericConstant from "../../../../constants/numericConstant"

test("returns a true wrapped in a right when all operations work", async () => {
	const success = and({
		operands: [
			{
				_tag: "numeric-operation",
				addends: [3, 4].map(makeNumericConstant),
				operation: "add",
			},
			{
				_tag: "numeric-operation",
				addends: [5, 6].map(makeNumericConstant),
				operation: "add",
			},
			{
				_tag: "numeric-operation",
				addends: [7, 8, 9].map(makeNumericConstant),
				operation: "add",
			},
		],
		operation: "and",
		returns: "boolean",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<boolean>).right).toBeTruthy()
})

test("returns an error when one or more operands is an error", async () => {
	const failure = and({
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
		operation: "and",
		returns: "boolean",
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Invalid boolean operation: lessThan.",
		"Invalid boolean operation: moreThan.",
	])
})
