import { test, expect } from "vitest"
import isInjectedOperation from "."
import makeInjectedNumber from "../makeInjectedConstant/makeInjectedNumer"

test("isInjectedOperation returns false for invalid types", () => {
	expect(isInjectedOperation([])).toBeFalsy()
	expect(isInjectedOperation("")).toBeFalsy()
	expect(
		isInjectedOperation({
			...makeInjectedNumber(1),
			source: "foo",
		}),
	).toBeFalsy()
})
