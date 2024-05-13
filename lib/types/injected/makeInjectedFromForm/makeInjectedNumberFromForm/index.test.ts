import { expect, test } from "vitest"
import makeInjectedNumberFromForm from "."

test("creates an InjcetedFromForm<'number'> object", () => {
	expect(makeInjectedNumberFromForm("formField")).toEqual({
		_tag: "injectorOperation",
		field: "formField",
		injectedDataType: "number",
		source: "form",
	})
})
