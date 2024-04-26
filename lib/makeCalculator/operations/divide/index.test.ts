import type { DivideOperation } from "../../../types"

import { expect, test } from "vitest"
import { isLeft, left, right } from "@sitebender/fp/lib/either"
import { some } from "@sitebender/fp/lib/option"
import divide from "."

test("divides a divisor into a dividend", async () => {
	const success = divide({
		dividend: {
			dividend: 120,
			divisor: 5,
			operation: "divide",
			returns: "number",
		},
		divisor: {
			dividend: 12,
			divisor: 2,
			operation: "divide",
			returns: "number",
		},
		operation: "divide",
		returns: "number",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(4)))
})

test("divides a divisor into a dividend with an input", async () => {
	const success = divide({
		divisor: {
			operation: "injectFromArgument",
		},
		dividend: {
			dividend: 12,
			divisor: 2,
			operation: "divide",
			returns: "number",
		},
		operation: "divide",
		returns: "number",
	})(some(2))

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(3)))
})

test("returns an error when dividend and/or divisor is an error", async () => {
	const failure = divide({
		dividend: {
			operation: "fail",
			returns: "error",
		} as unknown as DivideOperation,
		divisor: {
			operation: "fail",
			returns: "error",
		} as unknown as DivideOperation,
		operation: "divide",
		returns: "number",
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect(failure).toEqual(
		left([
			"Invalid numeric operation: fail.",
			"Invalid numeric operation: fail.",
		]),
	)
})
