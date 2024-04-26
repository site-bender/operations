import type { AddOperation } from "../../../types"

import { expect, test } from "vitest"
import { isLeft, left, right } from "@sitebender/fp/lib/either"
import { none, some } from "@sitebender/fp/lib/option"
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
	})(none)

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(42)))
})

test("adds a set of numbers together with an input", async () => {
	const success = add({
		addends: [
			{
				operation: "injectFromArgument",
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
	})(some(3))

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(38)))
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
	})(none)

	expect(isLeft(failure)).toBeTruthy()
	expect(failure).toStrictEqual(
		left([
			"Invalid numeric operation: fail.",
			"Invalid numeric operation: fail.",
		]),
	)
})
