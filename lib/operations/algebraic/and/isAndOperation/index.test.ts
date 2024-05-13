import { test, expect } from "vitest"
import makeAndOperation from "../makeAndOperation"
import isAndOperation from "."

test("isAndOperation returns true for a valid object", () => {
	expect(isAndOperation(makeAndOperation([]))).toBeTruthy()
})

test("isAndOperation returns false for an invalid object", () => {
	expect(isAndOperation({ foo: "bar" })).toBeFalsy()
})
