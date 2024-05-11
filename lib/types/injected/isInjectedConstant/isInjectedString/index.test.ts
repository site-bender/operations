import { test, expect } from "vitest"
import isInjectedString from "."
import makeInjectedString from "../../makeInjectedConstant/makeInjectedString"

test("isInjectedString returns true for a valid object", () => {
	const valid = makeInjectedString("field")
	expect(isInjectedString(valid)).toBeTruthy()
})

test("isInjectedString returns false for an invalid object", () => {
	expect(isInjectedString({ foo: "bar" })).toBeFalsy()
})
