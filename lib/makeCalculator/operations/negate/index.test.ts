import type { NegateOperation } from "../../../types"

import { expect, test } from "vitest"
import { Left, isLeft, right } from "@sitebender/fp/lib/either"
import { some } from "@sitebender/fp/lib/option"
import negate from "."

test("negates a positive number", async () => {
	const success = negate({
		operand: 99,
		operation: "negate",
		returns: "number",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(-99)))
})

test("negates a positive number from an input", async () => {
	const success = negate({
		operand: {
			operation: "injectFromArgument",
		},
		operation: "negate",
		returns: "number",
	})(some(99))

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
