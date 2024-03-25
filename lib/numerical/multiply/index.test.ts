import type { Left, Right } from "fp-ts/lib/Either"
import { isLeft } from "fp-ts/lib/Either"
import { expect, test } from "vitest"

import multiply from "."

test("multiplies a set of numbers together", async () => {
	const success = multiply({
		multipliers: [
			{
				multipliers: [3, 4],
				operation: "multiply",
				returns: "number",
			},
			{
				multipliers: [5, 6],
				operation: "multiply",
				returns: "number",
			},
			{
				multipliers: [7, 8, 9],
				operation: "multiply",
				returns: "number",
			},
		],
		operation: "multiply",
		returns: "number",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<number>).right).toEqual(181440)
})

test("returns an error when one or more multipliers is an error", async () => {
	const failure = multiply({
		multipliers: [
			{
				operation: "fail",
				returns: "error",
			},
			{
				multipliers: [5, 6],
				operation: "multiply",
				returns: "number",
			},
			{
				operation: "fail",
				returns: "error",
			},
		],
		operation: "multiply",
		returns: "number",
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Unknown operation.",
		"Unknown operation.",
	])
})
