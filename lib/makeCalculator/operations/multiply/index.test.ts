import type { MultiplyOperation } from "../../../types"

import { expect, test } from "vitest"
import { isLeft, left, right } from "@sitebender/fp/lib/either"
import { none, some } from "@sitebender/fp/lib/option"
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
	})(none)

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(181440)))
})

test("multiplies a set of numbers together with an input param", async () => {
	const success = multiply({
		multipliers: [
			{
				operation: "getFromArgument",
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
	})(some(3))

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(45360)))
})

test("returns an error when one or more multipliers is an error", async () => {
	const failure = multiply({
		multipliers: [
			{
				operation: "fail",
				returns: "error",
			} as unknown as MultiplyOperation,
			{
				multipliers: [5, 6],
				operation: "multiply",
				returns: "number",
			},
			{
				operation: "fail",
				returns: "error",
			} as unknown as MultiplyOperation,
		],
		operation: "multiply",
		returns: "number",
	})(none)

	expect(isLeft(failure)).toBeTruthy()
	expect(failure).toStrictEqual(
		left([
			"Invalid numeric operation: fail.",
			"Invalid numeric operation: fail.",
		]),
	)
})