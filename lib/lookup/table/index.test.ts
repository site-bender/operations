import { expect, test } from "vitest"
import { JSDOM } from "jsdom"
import { TableLookupOperation } from "../../types"
import tableLookup from "."
import { left, right } from "@sitebender/fp/lib/either"
import { some } from "@sitebender/fp/lib/option"

const operation: TableLookupOperation = {
	operation: "tableLookup",
	operand: {
		operation: "formInput",
		name: "foo",
		returns: "string",
	},
	test: [
		{
			operation: "tableValue",
			operands: {
				operation: "lessThan",
				//TODO this operand isn't used in this calc; need to refactor the lessThan implementation to
				// product a function
				operand: 1,
				test: 10,
				returns: "boolean",
			},
			returns: "number",
			value: 1,
		},
		{
			operation: "tableValue",
			operands: {
				operation: "lessThan",
				operand: 1,
				test: 500,
				returns: "boolean",
			},
			returns: "number",
			value: 0.5,
		},
	],
	returns: "string",
}

test("returns a value for a mapped key", () => {
	const dom = new JSDOM(
		`<!DOCTYPE html>
	<input name="foo" type="text" value="100">
`,
	)

	globalThis.document = dom.window.document

	expect(tableLookup(operation)()).toEqual(right(some(0.5)))
})

test("returns a failure for a non-existant key", () => {
	const dom = new JSDOM(
		`<!DOCTYPE html>
	<input name="foo" type="text" value="1000">
`,
	)

	globalThis.document = dom.window.document

	expect(tableLookup(operation)()).toEqual(
		left(["All lookup tests failed for value 1000"]),
	)
})

test("returns a value for a mapped key from an input", () => {
	const dom = new JSDOM(
		`<!DOCTYPE html>
	<input name="foo" type="text" value="1000">
`,
	)

	globalThis.document = dom.window.document

	const withParam: TableLookupOperation = {
		...operation,
		operand: {
			operation: "fromParam",
		},
	}

	expect(tableLookup(withParam)(some(100))).toEqual(right(some(0.5)))
})
