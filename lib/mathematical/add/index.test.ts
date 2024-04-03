import { isLeft, left, right } from "../../fp/either"
import { some } from "../../fp/option"
import { expect, test } from "vitest"

import add from "."

test("adds a set of numbers together", async () => {
	const success = add({
		addends: [
			{
				addends: [3, 4],
				operation: "add",
				returns: "number",
			},
			{
				addends: [5, 6],
				operation: "add",
				returns: "number",
			},
			{
				addends: [7, 8, 9],
				operation: "add",
				returns: "number",
			},
		],
		operation: "add",
		returns: "number",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(42)))
})

test("returns an error when one or more addends is an error", async () => {
	const failure = add({
		addends: [
			{
				operation: "fail",
				returns: "error",
			} as unknown as AddOperation,
			{
				addends: [5, 6],
				operation: "add",
				returns: "number",
			},
			{
				operation: "fail",
				returns: "error",
			} as unknown as AddOperation,
		],
		operation: "add",
		returns: "number",
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect(failure).toStrictEqual(
		left([
			"Invalid numeric operation: fail.",
			"Invalid numeric operation: fail.",
		]),
	)
})
