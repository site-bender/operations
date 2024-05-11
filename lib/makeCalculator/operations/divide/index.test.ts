import { expect, test } from "vitest"
import { isLeft, left, right } from "@sitebender/fp/lib/either"
import { some } from "@sitebender/fp/lib/option"
import divide from "."
import { DivideOperation } from "../../../types"
import makeInjectedNumber from "../../../types/injected/makeInjectedConstant/makeInjectedNumer"
import injectedNumberArg from "../../../types/injected/makeInjectedArgument/makeInjectedNumberArg"

test("divides a divisor into a dividend", async () => {
	const success = divide({
		_tag: "numeric-operation",
		dividend: {
			_tag: "numeric-operation",
			dividend: makeInjectedNumber(120),
			divisor: makeInjectedNumber(5),
			operation: "divide",
		},
		divisor: {
			_tag: "numeric-operation",
			dividend: makeInjectedNumber(12),
			divisor: makeInjectedNumber(2),
			operation: "divide",
		},
		operation: "divide",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(4)))
})

test("divides a divisor into a dividend with an input", async () => {
	const success = divide({
		_tag: "numeric-operation",
		divisor: injectedNumberArg,
		dividend: {
			_tag: "numeric-operation",
			dividend: makeInjectedNumber(120),
			divisor: makeInjectedNumber(20),
			operation: "divide",
		},
		operation: "divide",
	})(some(2))

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(3)))
})

test("returns an error when dividend and/or divisor is an error", async () => {
	const failure = divide({
		_tag: "numeric-operation",
		dividend: {
			operation: "fail",
			returns: "error",
		} as unknown as DivideOperation,
		divisor: {
			operation: "fail",
			returns: "error",
		} as unknown as DivideOperation,
		operation: "divide",
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect(failure).toEqual(
		left([
			"Invalid numeric operation: fail.",
			"Invalid numeric operation: fail.",
		]),
	)
})
