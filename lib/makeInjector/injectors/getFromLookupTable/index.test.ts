import type { GetFromLookupTableOperation } from "../../../types"

import { expect, test } from "vitest"
import { JSDOM } from "jsdom"

import left from "@sitebender/fp/lib/either/left"
import right from "@sitebender/fp/lib/either/right"
import some from "@sitebender/fp/lib/option/some"

import getFromLookupTable from "."

const operation: GetFromLookupTableOperation = {
	operation: "getFromLookupTable",
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

test("[getFromLookupTable] (injectors) returns a value for a mapped key", () => {
	const dom = new JSDOM(
		`<!DOCTYPE html>
	<input name="foo" type="text" value="100">
`,
	)

	globalThis.document = dom.window.document

	expect(getFromLookupTable(operation)()).toEqual(right(some(0.5)))
})

test("[getFromLookupTable] (injectors) returns a failure for a non-existant key", () => {
	const dom = new JSDOM(
		`<!DOCTYPE html>
	<input name="foo" type="text" value="1000">
`,
	)

	globalThis.document = dom.window.document

	expect(getFromLookupTable(operation)()).toEqual(
		left(["All lookup tests failed for value 1000"]),
	)
})

test("[getFromLookupTable] (injectors) returns a value for a mapped key from an input", () => {
	const dom = new JSDOM(
		`<!DOCTYPE html>
	<input name="foo" type="text" value="1000">
`,
	)

	globalThis.document = dom.window.document

	const withParam: GetFromLookupTableOperation = {
		...operation,
		operand: {
			operation: "getFromArgument",
		},
	}

	expect(getFromLookupTable(withParam)(some(100))).toEqual(right(some(0.5)))
})
