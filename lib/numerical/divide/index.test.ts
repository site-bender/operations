import type { Left, Right } from "fp-ts/lib/Either"
import { isLeft } from "fp-ts/lib/Either"
import { expect, test } from "vitest"

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
	expect((success as Right<number>).right).toEqual(4)
})

test("returns an error when dividend and/or divisor is an error", async () => {
	const failure = divide({
		dividend: {
			dividend: 120,
			divisor: 0,
			operation: "divide",
			returns: "number",
		},
		divisor: {
			dividend: 12,
			divisor: 0,
			operation: "divide",
			returns: "number",
		},
		operation: "divide",
		returns: "number",
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Cannot divide by 0.",
		"Cannot divide by 0.",
	])
})
