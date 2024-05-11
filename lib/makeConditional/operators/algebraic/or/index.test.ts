import { right } from "@sitebender/fp/lib/either"
import { expect, test } from "vitest"

import or from "."
import makeInjectedNumber from "../../../../types/injected/makeInjectedConstant/makeInjectedNumer"
import makeOrOperation from "../../../../types/algebraic/or/makeOrOperation"
import makeLessThan from "../../../../types/conditional/lessThan/makelessThan"
import makeMoreThan from "../../../../types/conditional/moreThan/makeMoreThan"

test("returns a true wrapped in a right when one operation works", async () => {
	const success = or(
		makeOrOperation([
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
