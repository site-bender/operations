import type { Left, Right } from "fp-ts/lib/Either"
import { isLeft } from "fp-ts/lib/Either"
import { expect, test } from "vitest"

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
	expect((success as Right<number>).right).toEqual(6)
})

test("returns an error when radicand or index is an error", async () => {
	const failure = root({
		radicand: {
			dividend: 120,
			divisor: 0,
			operation: "divide",
			returns: "number",
		},
		index: {
			operation: "fail",
			returns: "error",
		},
		operation: "root",
		returns: "number",
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Cannot divide by 0.",
		"Unknown operation.",
	])
})
