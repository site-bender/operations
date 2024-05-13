import { test, expect } from "vitest"
import makeInjectedString from "."

test("constructs an InjectedConstant<'string'>", () => {
	expect(makeInjectedString("hello")).toEqual({
		_tag: "injectorOperation",
		injectedDataType: "string",
		source: "constant",
		value: "hello",
	})
})
