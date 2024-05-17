import { type SbSubtractOperation } from "../../../types"

import { expect, test } from "vitest"
import { Left, isLeft, right } from "@sitebender/fp/lib/either"
import subtract from "."
import { none, some } from "@sitebender/fp/lib/option"
import injectedNumberArg from "../../../operations/injected/makeInjectedArgument/makeInjectedNumberArg"
import makeInjectedNumber from "../../../operations/injected/makeInjectedConstant/makeInjectedNumber"

test("subtracts a subtrahend from a minuend", async () => {
	const success = subtract({
		_tag: "numericOperation",
		minuend: {
			_tag: "numericOperation",
			minuend: makeInjectedNumber(120),
			subtrahend: makeInjectedNumber(60),
			operation: "subtract",
		},
		subtrahend: {
			_tag: "numericOperation",
			minuend: makeInjectedNumber(60),
			subtrahend: makeInjectedNumber(30),
			operation: "subtract",
		},
		operation: "subtract",
	})(none)

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(30)))
})

test("subtracts a subtrahend from a minuend with an input", async () => {
	const success = subtract({
		_tag: "numericOperation",
		minuend: injectedNumberArg,
		subtrahend: {
			_tag: "numericOperation",
			minuend: makeInjectedNumber(60),
			subtrahend: makeInjectedNumber(30),
			operation: "subtract",
		},
		operation: "subtract",
	})(some(120))

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(90)))
})

test("returns an error when minuend and/or subtrahend is an error", async () => {
	const failure = subtract({
		_tag: "numericOperation",
		minuend: {
			operation: "fail",
			returns: "error",
		} as unknown as SbSubtractOperation,
		subtrahend: {
			_tag: "numericOperation",
			minuend: makeInjectedNumber(12),
			subtrahend: makeInjectedNumber(0),
			operation: "subtract",
		},
		operation: "subtract",
	})(none)

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Invalid numeric operation: fail.",
	])
})

test("returns an error when minuend and/or subtrahend is NaN", async () => {
	const failure = subtract({
		_tag: "numericOperation",
		minuend: makeInjectedNumber(Number.MIN_SAFE_INTEGER),
		subtrahend: makeInjectedNumber(Number.NaN),
		operation: "subtract",
	})(none)

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Invalid numeric operation: divide.",
	])
})
