import { type MultiplyOperation } from "../../../types"

import { expect, test } from "vitest"
import { isLeft, left, right } from "@sitebender/fp/lib/either"
import { none, some } from "@sitebender/fp/lib/option"
import multiply from "."
import makeInjectedNumber from "../../../types/injected/makeInjectedConstant/makeInjectedNumer"
import injectedNumberArg from "../../../types/injected/makeInjectedArgument/makeInjectedNumberArg"

test("multiplies a set of numbers together", async () => {
	const success = multiply({
		_tag: "numericOperation",
		multipliers: [
			{
				_tag: "numericOperation",
				multipliers: [3, 4].map(makeInjectedNumber),
				operation: "multiply",
			},
			{
				_tag: "numericOperation",
				multipliers: [5, 6].map(makeInjectedNumber),
				operation: "multiply",
			},
			{
				_tag: "numericOperation",
				multipliers: [7, 8, 9].map(makeInjectedNumber),
				operation: "multiply",
			},
		],
		operation: "multiply",
	})(none)

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(181440)))
})

test("multiplies a set of numbers together with an input param", async () => {
	const success = multiply({
		_tag: "numericOperation",
		multipliers: [
			injectedNumberArg,
			{
				_tag: "numericOperation",
				multipliers: [5, 6].map(makeInjectedNumber),
				operation: "multiply",
			},
			{
				_tag: "numericOperation",
				multipliers: [7, 8, 9].map(makeInjectedNumber),
				operation: "multiply",
			},
		],
		operation: "multiply",
	})(some(3))

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(45360)))
})

test("returns an error when one or more multipliers is an error", async () => {
	const failure = multiply({
		_tag: "numericOperation",
		multipliers: [
			{
				operation: "fail",
				returns: "error",
			} as unknown as MultiplyOperation,
			{
				_tag: "numericOperation",
				multipliers: [5, 6].map(makeInjectedNumber),
				operation: "multiply",
			},
			{
				operation: "fail",
				returns: "error",
			} as unknown as MultiplyOperation,
		],
		operation: "multiply",
	})(none)

	expect(isLeft(failure)).toBeTruthy()
	expect(failure).toStrictEqual(
		left([
			"Invalid numeric operation: fail.",
			"Invalid numeric operation: fail.",
		]),
	)
})
