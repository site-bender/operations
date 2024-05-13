import { test, expect } from "vitest"
import makeOrOperation from "../makeOrOperation"
import isOrOperation from "."

test("isOrOperation returns true for a valid object", () => {
	expect(isOrOperation(makeOrOperation([]))).toBeTruthy()
})

test("isOrOperation returns false for an invalid object", () => {
	expect(isOrOperation({ foo: "bar" })).toBeFalsy()
})
