import type { Right } from "fp-ts/lib/Either"
import { isLeft } from "fp-ts/lib/Either"
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
	expect((success as Right<number>).right).toEqual(42)
})

test("returns an error when one or more addends is an error", async () => {
	const failure = add({
		addends: [
			{
				operation: "fail",
				returns: "error",
			} as any as AddOperation,
			{
				addends: [5, 6],
				operation: "add",
				returns: "number",
			},
			{
				operation: "fail",
				returns: "error",
			} as any as AddOperation,
		],
		operation: "add",
		returns: "number",
	})()

	expect(isLeft(failure)).toBeTruthy()
})
