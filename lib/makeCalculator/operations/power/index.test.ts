import { type PowerOperation } from "../../../types"

import { expect, test } from "vitest"
import { Left, isLeft, right } from "@sitebender/fp/lib/either"
import { some } from "@sitebender/fp/lib/option"
import power from "."
import makeInjectedNumber from "../../../types/injected/makeInjectedConstant/makeInjectedNumer"
import injectedNumberArg from "../../../types/injected/makeInjectedArgument/makeInjectedNumberArg"

test("raises a base to an exponent correctly", async () => {
	const success = power({
		_tag: "numeric-operation",
		base: {
			_tag: "numeric-operation",
			dividend: makeInjectedNumber(120),
			divisor: makeInjectedNumber(20),
			operation: "divide",
		},
		exponent: makeInjectedNumber(3),
		operation: "power",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(216)))
})

test("raises a base to an exponent correctly from an input", async () => {
	const success = power({
		_tag: "numeric-operation",
		base: {
			_tag: "numeric-operation",
			dividend: makeInjectedNumber(120),
			divisor: makeInjectedNumber(20),
			operation: "divide",
		},
		exponent: injectedNumberArg,
		operation: "power",
	})(some(3))

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(216)))
})

test("returns an error when base or exponent is an error", async () => {
	const failure = power({
		_tag: "numeric-operation",
		base: {
			_tag: "numeric-operation",
			dividend: makeInjectedNumber(120),
			divisor: makeInjectedNumber(0),
			operation: "divide",
		},
		exponent: {
			operation: "fail",
			returns: "error",
		} as unknown as PowerOperation,
		operation: "power",
	})()

	expect(isLeft(failure)).toBeTruthy()
	// TODO: collect errors!
	expect((failure as Left<Array<string>>).left).toEqual([
		"Invalid numeric operation: divide.",
		"Invalid numeric operation: fail.",
	])
})
