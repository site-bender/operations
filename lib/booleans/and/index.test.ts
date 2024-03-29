import { isLeft } from "../../fp/either"
import { expect, test } from "vitest"

import and from "."

test("returns a true wrapped in a right when all operations work", async () => {
	const success = and({
		operands: [
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
		operation: "and",
		returns: "boolean",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<boolean>).right).toBeTruthy()
})

test("returns an error when one or more operands is an error", async () => {
	const failure = and({
		operands: [
			{
				operation: "fail",
				returns: "error",
			},
			{
				addends: [5, 6],
				operation: "add",
				returns: "number",
			},
			{
				operation: "fail",
				returns: "error",
			},
		],
		operation: "and",
		returns: "boolean",
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Unknown operation: fail.",
	])
})
