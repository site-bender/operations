import { type RootOperation } from "../../../types"

import { expect, test } from "vitest"
import { Left, isLeft, right } from "@sitebender/fp/lib/either"
import { some } from "@sitebender/fp/lib/option"
import root from "."
import makeInjectedNumber from "../../../operations/injected/makeInjectedConstant/makeInjectedNumer"
import injectedNumberArg from "../../../operations/injected/makeInjectedArgument/makeInjectedNumberArg"

test("gets the indexed root of the radicand correctly", async () => {
	const success = root({
		_tag: "numericOperation",
		radicand: {
			_tag: "numericOperation",
			addends: [200, 16].map(makeInjectedNumber),
			operation: "add",
		},
		index: makeInjectedNumber(3),
		operation: "root",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(6)))
})

test("gets the indexed root of the radicand correctly with an iput param", async () => {
	const success = root({
		_tag: "numericOperation",
		radicand: injectedNumberArg,
		index: makeInjectedNumber(3),
		operation: "root",
	})(some(216))

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(6)))
})

test("returns an error when radicand or index is an error", async () => {
	const failure = root({
		_tag: "numericOperation",
		radicand: {
			_tag: "numericOperation",
			dividend: makeInjectedNumber(120),
			divisor: makeInjectedNumber(6),
			operation: "divide",
		},
		index: {
			operation: "fail",
			returns: "error",
		} as unknown as RootOperation,
		operation: "root",
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Invalid numeric operation: fail.",
	])
})
