import { test, expect } from "vitest"
import makeInjectedString from "."

test("constructs an InjectedConstant<'string'>", () => {
	expect(makeInjectedString("hello")).toEqual({
		_tag: "injector-operation",
		operation: "string",
		source: "constant",
		value: "hello",
	})
})
