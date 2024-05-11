import { Left, Right, isLeft } from "@sitebender/fp/lib/either"
import { expect, test } from "vitest"

import and from "."
import makeInjectedNumber from "../../../../types/injected/makeInjectedConstant/makeInjectedNumer"
import makeLessThan from "../../../../types/conditional/lessThan/makelessThan"
import makeAndOperation from "../../../../types/algebraic/and/makeAndOperation"
import { OperationTags } from "../../../../types"

test("returns a true wrapped in a right when all operations work", async () => {
	const success = and(
		makeAndOperation([
			{
				_tag: OperationTags.numeric,
				addends: [3, 4].map(makeInjectedNumber),
				operation: "add",
			},
			{
				_tag: OperationTags.numeric,
				addends: [5, 6].map(makeInjectedNumber),
				operation: "add",
			},
			{
				_tag: OperationTags.numeric,
				addends: [7, 8, 9].map(makeInjectedNumber),
				operation: "add",
			},
		]),
	)()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<boolean>).right).toBeTruthy()
})

test("returns an error when one or more operands is an error", async () => {
	const failure = and(
		makeAndOperation([
			makeLessThan({
				operand: makeInjectedNumber(5),
				test: makeInjectedNumber(3),
			}),
			makeLessThan({
				operand: makeInjectedNumber(10),
				test: makeInjectedNumber(5),
			}),
		]),
	)()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Invalid boolean operation: lessThan.",
		"Invalid boolean operation: moreThan.",
	])
})
