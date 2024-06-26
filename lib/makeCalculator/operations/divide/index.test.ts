import { expect, test } from "vitest"
import { isLeft, left, right } from "@sitebender/fp/lib/either"
import { some } from "@sitebender/fp/lib/option"
import divide from "."
import { SbDivideOperation } from "../../../types"
import makeInjectedNumber from "../../../operations/injected/makeInjectedConstant/makeInjectedNumber"
import injectedNumberArg from "../../../operations/injected/makeInjectedArgument/makeInjectedNumberArg"

test("divides a divisor into a dividend", async () => {
	const success = divide({
		_tag: "numericOperation",
		dividend: {
			_tag: "numericOperation",
			dividend: makeInjectedNumber(120),
			divisor: makeInjectedNumber(5),
			operation: "divide",
		},
		divisor: {
			_tag: "numericOperation",
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
		_tag: "numericOperation",
		divisor: injectedNumberArg,
		dividend: {
			_tag: "numericOperation",
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
		_tag: "numericOperation",
		dividend: {
			operation: "fail",
			returns: "error",
		} as unknown as SbDivideOperation,
		divisor: {
			operation: "fail",
			returns: "error",
		} as unknown as SbDivideOperation,
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
