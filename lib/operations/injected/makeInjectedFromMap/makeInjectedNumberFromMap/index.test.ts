import { expect, test } from "vitest"
import makeInjectedNumberFromMap from "."
import makeInjectedNumber from "../../makeInjectedConstant/makeInjectedNumber"
import makeInjectedString from "../../makeInjectedConstant/makeInjectedString"

test("creates an InjectedFromMap<'number'> object", () => {
	expect(
		makeInjectedNumberFromMap({
			column: makeInjectedNumber(1),
			operand: makeInjectedString("100"),
			test: { "100": [1, 2, 3] },
		}),
	).toEqual({
		_tag: "injectorOperation",
		column: {
			_tag: "injectorOperation",
			injectedDataType: "number",
			type: "constant",
			value: 1,
		},
		injectedDataType: "number",
		operand: {
			_tag: "injectorOperation",
			injectedDataType: "string",
			type: "constant",
			value: "100",
		},
		test: {
			"100": [1, 2, 3],
		},
		type: "map",
	})
})
