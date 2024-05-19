import { test, expect } from "vitest"
import makeInjectedBooleanArg from "."

test("isInjectedBoolean returns true for a valid object", () => {
	const valid = makeInjectedBooleanArg
	expect(valid).toEqual({
		_tag: "injectorOperation",
		injectedDataType: "boolean",
		type: "argument",
	})
})
