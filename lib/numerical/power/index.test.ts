import type { Left, Right } from "fp-ts/lib/Either"
import { isLeft } from "fp-ts/lib/Either"
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
	expect((success as Right<number>).right).toEqual(216)
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
		},
		operation: "power",
		returns: "number",
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Cannot divide by 0.",
		"Unknown operation.",
	])
})
