import { expect, test } from "vitest"
import makeInjectedNumberFromForm from "."

test("creates an InjcetedFromForm<'number'> object", () => {
	expect(
		makeInjectedNumberFromForm({ name: "field", tagName: "field" }),
	).toEqual({
		_tag: "injectorOperation",
		source: {
			name: "field",
			tagName: "field",
		},
		injectedDataType: "number",
		type: "form",
	})
})
