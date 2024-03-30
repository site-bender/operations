import { isLeft } from "../../fp/either"
import { expect, test } from "vitest"

import or from "."

test("returns a true wrapped in a right when any operation works", async () => {
	const success = or({
		operands: [
			{
				addends: [3, 4],
				operation: "add",
				returns: "number",
			},
			{
				operation: "fail",
				returns: "error",
			},
			{
				addends: [7, 8, 9],
				operation: "add",
				returns: "number",
			},
		],
		operation: "or",
		returns: "boolean",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<boolean>).right).toBeTruthy()
})

test("returns an error when all operands are errors", async () => {
	const failure = or({
		operands: [
			{
				operation: "fail",
				returns: "error",
			},
			{
				operation: "fail",
				returns: "error",
			},
			{
				operation: "fail",
				returns: "error",
			},
		],
		operation: "or",
		returns: "boolean",
	})()

	expect(isLeft(failure)).toBeTruthy()
	//expect((failure as Left<Array<string>>).left).toEqual([
	//	"Unknown operation.",
	//	"Unknown operation.",
	//	"Unknown operation.",
	//])
})
