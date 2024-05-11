import { test, expect } from "vitest"
import isAlgebraicOperation from "."
import makeAndOperation from "../and/makeAndOperation"

test("isAlgebraicOperation returns false for invalid types", () => {
	expect(isAlgebraicOperation([])).toBeFalsy()
	expect(isAlgebraicOperation("")).toBeFalsy()
	expect(
		isAlgebraicOperation({
			...makeAndOperation([]),
			operation: "foo",
		}),
	).toBeFalsy()
})
