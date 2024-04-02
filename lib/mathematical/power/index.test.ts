import { isLeft, right } from "../../fp/either"
import { some } from "../../fp/option"
import { expect, test } from "vitest"

import power from "."

test("raises a base to an exponent correctly", async () => {
	const success = power({
		base: {
			dividend: 120,
			divisor: 20,
			operation: "divide",
			returns: "number",
		},
		exponent: 3,
		operation: "power",
		returns: "number",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(216)))
})

test("returns an error when base or exponent is an error", async () => {
	const failure = power({
		base: {
			dividend: 120,
			divisor: 0,
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
	])
})
