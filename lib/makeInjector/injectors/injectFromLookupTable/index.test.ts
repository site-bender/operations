import { type InjectFromLookupTableOperation } from "../../../types"

import { expect, test } from "vitest"
import { JSDOM } from "jsdom"

import left from "@sitebender/fp/lib/either/left"
import right from "@sitebender/fp/lib/either/right"
import some from "@sitebender/fp/lib/option/some"

import injectFromLookupTable from "."
import makeNumericConstant from "../../../constants/numericConstant"

const operation: InjectFromLookupTableOperation = {
	operation: "injectFromLookupTable",
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
				operand: makeNumericConstant(1),
				test: makeNumericConstant(10),
				returns: "boolean",
			},
			returns: "number",
			value: 1,
		},
		{
			operation: "tableValue",
			operands: {
				operation: "lessThan",
				operand: makeNumericConstant(1),
				test: makeNumericConstant(500),
				returns: "boolean",
			},
			returns: "number",
			value: 0.5,
		},
	],
	returns: "string",
}

test("[injectFromLookupTable] (injectors) returns a value for a mapped key", () => {
	const dom = new JSDOM(
		`<!DOCTYPE html>
	<input name="foo" type="text" value="100">
`,
	)

	globalThis.document = dom.window.document

	expect(injectFromLookupTable(operation)()).toEqual(right(some(0.5)))
})

test("[injectFromLookupTable] (injectors) returns a failure for a non-existant key", () => {
	const dom = new JSDOM(
		`<!DOCTYPE html>
	<input name="foo" type="text" value="1000">
`,
	)

	globalThis.document = dom.window.document

	expect(injectFromLookupTable(operation)()).toEqual(
		left(["All lookup tests failed for value 1000"]),
	)
})

test("[injectFromLookupTable] (injectors) returns a value for a mapped key from an input", () => {
	const dom = new JSDOM(
		`<!DOCTYPE html>
	<input name="foo" type="text" value="1000">
`,
	)

	globalThis.document = dom.window.document

	const withParam: InjectFromLookupTableOperation = {
		...operation,
		operand: {
			operation: "injectFromArgument",
		},
	}

	expect(injectFromLookupTable(withParam)(some(100))).toEqual(right(some(0.5)))
})
