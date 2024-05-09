import { type RootOperation } from "../../../types"

import { expect, test } from "vitest"
import { Left, isLeft, right } from "@sitebender/fp/lib/either"
import { some } from "@sitebender/fp/lib/option"
import root from "."
import makeNumericConstant from "../../../constants/numericConstant"

test("gets the indexed root of the radicand correctly", async () => {
	const success = root({
		_tag: "numeric-operation",
		radicand: {
			_tag: "numeric-operation",
			addends: [200, 16].map(makeNumericConstant),
			operation: "add",
		},
		index: makeNumericConstant(3),
		operation: "root",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(6)))
})

test("gets the indexed root of the radicand correctly with an iput param", async () => {
	const success = root({
		_tag: "numeric-operation",
		radicand: {
			operation: "injectFromArgument",
		},
		index: makeNumericConstant(3),
		operation: "root",
	})(some(216))

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(6)))
})

test("returns an error when radicand or index is an error", async () => {
	const failure = root({
		_tag: "numeric-operation",
		radicand: {
			_tag: "numeric-operation",
			dividend: makeNumericConstant(120),
			divisor: makeNumericConstant(6),
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
