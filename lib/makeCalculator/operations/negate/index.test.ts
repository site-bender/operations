import { type NegateOperation } from "../../../types"

import { expect, test } from "vitest"
import { Left, isLeft, right } from "@sitebender/fp/lib/either"
import { some } from "@sitebender/fp/lib/option"
import negate from "."
import makeNumericConstant from "../../../constants/numericConstant"

test("negates a positive number", async () => {
	const success = negate({
		_tag: "numeric-operation",
		operand: makeNumericConstant(99),
		operation: "negate",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(-99)))
})

test("negates a positive number from an input", async () => {
	const success = negate({
		_tag: "numeric-operation",
		operand: {
			operation: "injectFromArgument",
		},
		operation: "negate",
	})(some(99))

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(-99)))
})

test("returns a positive number when the operand is negative", async () => {
	const success = negate({
		_tag: "numeric-operation",
		operand: makeNumericConstant(-99),
		operation: "negate",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(99)))
})

test("returns an error when the operand is an error", async () => {
	const failure = negate({
		_tag: "numeric-operation",
		operand: {
			operation: "fail",
			returns: "error",
		} as unknown as NegateOperation,
		operation: "negate",
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Invalid numeric operation: fail.",
	])
})
