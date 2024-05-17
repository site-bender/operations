import { right } from "@sitebender/fp/lib/either"
import { expect, test } from "vitest"

import or from "."
import makeInjectedNumber from "../../../../operations/injected/makeInjectedConstant/makeInjectedNumber"
import makeOrOperation from "../../../../operations/algebraic/or/makeOrOperation"
import makeLessThan from "../../../../operations/conditional/lessThan/makelessThan"
import makeMoreThan from "../../../../operations/conditional/moreThan/makeMoreThan"

test("returns a true wrapped in a right when one operation works", async () => {
	const success = or(
		makeOrOperation([
			{
				_tag: "numericOperation",
				addends: [7, 8, 9].map(makeInjectedNumber),
				operation: "add",
			},
			{
				_tag: "numericOperation",
				addends: [5, 6].map(makeInjectedNumber),
				operation: "add",
			},
			makeLessThan({
				operand: makeInjectedNumber(5),
				test: makeInjectedNumber(3),
			}),
		]),
	)()

	expect(success).toEqual(right(true))
})

test("returns false wrapped in a right when all operands fail", async () => {
	const failure = or(
		makeOrOperation([
			makeLessThan({
				operand: makeInjectedNumber(5),
				test: makeInjectedNumber(3),
			}),
			makeMoreThan({
				operand: makeInjectedNumber(5),
				test: makeInjectedNumber(10),
			}),
		]),
	)()

	expect(failure).toEqual(right(false))
})
