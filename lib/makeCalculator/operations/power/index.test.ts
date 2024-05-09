import { type PowerOperation } from "../../../types"

import { expect, test } from "vitest"
import { Left, isLeft, right } from "@sitebender/fp/lib/either"
import { some } from "@sitebender/fp/lib/option"
import power from "."
import makeNumericConstant from "../../../constants/numericConstant"

test("raises a base to an exponent correctly", async () => {
	const success = power({
		base: {
			dividend: makeNumericConstant(120),
			divisor: makeNumericConstant(20),
			operation: "divide",
			returns: "number",
		},
		exponent: makeNumericConstant(3),
		operation: "power",
		returns: "number",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(216)))
})

test("raises a base to an exponent correctly from an input", async () => {
	const success = power({
		base: {
			dividend: makeNumericConstant(120),
			divisor: makeNumericConstant(20),
			operation: "divide",
			returns: "number",
		},
		exponent: {
			operation: "injectFromArgument",
		},
		operation: "power",
		returns: "number",
	})(some(3))

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(216)))
})

test("returns an error when base or exponent is an error", async () => {
	const failure = power({
		base: {
			dividend: makeNumericConstant(120),
			divisor: makeNumericConstant(0),
			operation: "divide",
			returns: "number",
		},
		exponent: {
			operation: "fail",
			returns: "error",
		} as unknown as PowerOperation,
		operation: "power",
		returns: "number",
	})()

	expect(isLeft(failure)).toBeTruthy()
	// TODO: collect errors!
	expect((failure as Left<Array<string>>).left).toEqual([
		"Invalid numeric operation: divide.",
		"Invalid numeric operation: fail.",
	])
})
