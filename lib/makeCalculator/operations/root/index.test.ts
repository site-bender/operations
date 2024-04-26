import type { RootOperation } from "../../../types"

import { expect, test } from "vitest"
import { Left, isLeft, right } from "@sitebender/fp/lib/either"
import { some } from "@sitebender/fp/lib/option"
import root from "."

test("gets the indexed root of the radicand correctly", async () => {
	const success = root({
		radicand: {
			addends: [200, 16],
			operation: "add",
			returns: "number",
		},
		index: 3,
		operation: "root",
		returns: "number",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(6)))
})

test("gets the indexed root of the radicand correctly with an iput param", async () => {
	const success = root({
		radicand: {
			operation: "getFromArgument",
		},
		index: 3,
		operation: "root",
		returns: "number",
	})(some(216))

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(6)))
})

test("returns an error when radicand or index is an error", async () => {
	const failure = root({
		radicand: {
			dividend: 120,
			divisor: 6,
			operation: "divide",
			returns: "number",
		},
		index: {
			operation: "fail",
			returns: "error",
		} as unknown as RootOperation,
		operation: "root",
		returns: "number",
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Invalid numeric operation: fail.",
	])
})
