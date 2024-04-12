import { Left, isLeft, right } from "@sitebender/fp/lib/either"
import { expect, test } from "vitest"

import negate from "."
import { some } from "@sitebender/fp/lib/option"

test("negates a positive number", async () => {
	const success = negate({
		operand: 99,
		operation: "negate",
		returns: "number",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(-99)))
})

test("returns a positive number when the operand is negative", async () => {
	const success = negate({
		operand: -99,
		operation: "negate",
		returns: "number",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(99)))
})

test("returns an error when the operand is an error", async () => {
	const failure = negate({
		operand: {
			operation: "fail",
			returns: "error",
		} as unknown as NegateOperation,
		operation: "negate",
		returns: "number",
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Invalid numeric operation: fail.",
	])
})
