import { test, expect } from "vitest"
import makeInjectedNumberFromForm from "../../makeInjectedFromForm/makeInjectedNumberFromForm"
import isInjectedNumberFromForm from "."

test("isInjectedNumberFromForm returns true for a valid object", () => {
	const valid = makeInjectedNumberFromForm("field")
	expect(isInjectedNumberFromForm(valid)).toBeTruthy()
})

test("isInjectedNumberFromForm returns false for an invalid object", () => {
	expect(isInjectedNumberFromForm({ foo: "bar" })).toBeFalsy()
})
