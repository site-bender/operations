import { type SubtractOperation } from "../../../types"

import { expect, test } from "vitest"
import { Left, isLeft, right } from "@sitebender/fp/lib/either"
import subtract from "."
import { none, some } from "@sitebender/fp/lib/option"
import makeNumericConstant from "../../../constants/numericConstant"

test("subtracts a subtrahend from a minuend", async () => {
	const success = subtract({
		minuend: {
			minuend: makeNumericConstant(120),
			subtrahend: makeNumericConstant(60),
			operation: "subtract",
			returns: "number",
		},
		subtrahend: {
			minuend: makeNumericConstant(60),
			subtrahend: makeNumericConstant(30),
			operation: "subtract",
			returns: "number",
		},
		operation: "subtract",
		returns: "number",
	})(none)

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(30)))
})

test("subtracts a subtrahend from a minuend with an input", async () => {
	const success = subtract({
		minuend: {
			operation: "injectFromArgument",
		},
		subtrahend: {
			minuend: makeNumericConstant(60),
			subtrahend: makeNumericConstant(30),
			operation: "subtract",
			returns: "number",
		},
		operation: "subtract",
		returns: "number",
	})(some(120))

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(90)))
})

test("returns an error when minuend and/or subtrahend is an error", async () => {
	const failure = subtract({
		minuend: {
			operation: "fail",
			returns: "error",
		} as unknown as SubtractOperation,
		subtrahend: {
			minuend: makeNumericConstant(12),
			subtrahend: makeNumericConstant(0),
			operation: "subtract",
			returns: "number",
		},
		operation: "subtract",
		returns: "number",
	})(none)

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Invalid numeric operation: fail.",
	])
})
