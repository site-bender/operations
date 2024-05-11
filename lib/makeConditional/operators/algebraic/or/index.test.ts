import { right } from "@sitebender/fp/lib/either"
import { expect, test } from "vitest"

import or from "."
import makeInjectedNumber from "../../../../types/injected/makeInjectedConstant/makeInjectedNumer"

test("returns a true wrapped in a right when one operation works", async () => {
	const success = or({
		operands: [
			{
				_tag: "numeric-operation",
				addends: [7, 8, 9].map(makeInjectedNumber),
				operation: "add",
			},
			{
				_tag: "numeric-operation",
				addends: [5, 6].map(makeInjectedNumber),
				operation: "add",
			},
			{
				operand: makeInjectedNumber(5),
				operation: "lessThan",
				returns: "boolean",
				test: makeInjectedNumber(3),
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
				operand: makeInjectedNumber(5),
				operation: "lessThan",
				returns: "boolean",
				test: makeInjectedNumber(3),
			},
			{
				operand: makeInjectedNumber(10),
				operation: "moreThan",
				returns: "boolean",
				test: makeInjectedNumber(5),
			},
		],
		operation: "or",
		returns: "boolean",
	})()

	expect(failure).toEqual(right(false))
})
