import { Left, Right, isLeft } from "@sitebender/fp/lib/either"
import { expect, test } from "vitest"

import and from "."
import makeInjectedNumber from "../../../../operations/injected/makeInjectedConstant/makeInjectedNumer"
import makeLessThan from "../../../../operations/conditional/lessThan/makelessThan"
import makeAndOperation from "../../../../operations/algebraic/and/makeAndOperation"
import { SbOperationTags } from "../../../../types"

test("returns a true wrapped in a right when all operations work", async () => {
	const success = and(
		makeAndOperation([
			{
				_tag: SbOperationTags.numeric,
				addends: [3, 4].map(makeInjectedNumber),
				operation: "add",
			},
			{
				_tag: SbOperationTags.numeric,
				addends: [5, 6].map(makeInjectedNumber),
				operation: "add",
			},
			{
				_tag: SbOperationTags.numeric,
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
		"5 is not less than 3",
		"10 is not less than 5",
	])
})
