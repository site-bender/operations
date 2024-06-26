import { test, expect } from "vitest"
import isInjectedOperation from "."
import makeInjectedNumber from "../makeInjectedConstant/makeInjectedNumber"

test("isInjectedOperation returns false for invalid types", () => {
	expect(isInjectedOperation([])).toBeFalsy()
	expect(isInjectedOperation("")).toBeFalsy()
	expect(
		isInjectedOperation({
			...makeInjectedNumber(1),
			type: "foo",
		}),
	).toBeFalsy()
})
