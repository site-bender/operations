import { isLeft } from "fp-ts/lib/Either"
import { expect, test } from "vitest"

import subtract from "."

test("subtracts a subtrahend from a minuend", async () => {
	const success = subtract({
		minuend: {
			minuend: 120,
			subtrahend: 60,
			operation: "subtract",
			returns: "number",
		},
		subtrahend: {
			minuend: 60,
			subtrahend: 30,
			operation: "subtract",
			returns: "number",
		},
		operation: "subtract",
		returns: "number",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<number>).right).toEqual(30)
})

test("returns an error when minuend and/or subtrahend is an error", async () => {
	const failure = subtract({
		minuend: {
			operation: "fail",
			returns: "error",
		},
		subtrahend: {
			minuend: 12,
			subtrahend: 0,
			operation: "subtract",
			returns: "number",
		},
		operation: "subtract",
		returns: "number",
	})()

	expect(isLeft(failure)).toBeTruthy()
	//expect((failure as Left<Array<string>>).left).toEqual(["Unknown operation."])
})
