import {
	InjectorSource,
	OperationTags,
	type InjectFromLookupTable,
} from "../../../types"

import { expect, test } from "vitest"
import { JSDOM } from "jsdom"

import left from "@sitebender/fp/lib/either/left"
import right from "@sitebender/fp/lib/either/right"
import some from "@sitebender/fp/lib/option/some"

import injectFromLookupTable from "."
import makeInjectedNumber from "../../../operations/injected/makeInjectedConstant/makeInjectedNumer"
import makeInjectedNumberArg from "../../../operations/injected/makeInjectedArgument/makeInjectedNumberArg"
import makeLessThan from "../../../operations/conditional/lessThan/makelessThan"

const operation: InjectFromLookupTable<"number"> = {
	_tag: OperationTags.injector,
	operation: "number",
	source: InjectorSource.table,
	operand: {
		_tag: OperationTags.injector,
		injectedDataType: "number",
		source: InjectorSource.form,
		field: "foo",
	},
	test: [
		{
			operands: makeLessThan({
				//TODO this operand isn't used in this calc; need to refactor the lessThan implementation to
				// product a function
				operand: makeInjectedNumber(1),
				test: makeInjectedNumber(10),
			}),
			returns: "number",
			value: 1,
		},
		{
			operands: makeLessThan({
				operand: makeInjectedNumber(1),
				test: makeInjectedNumber(500),
			}),
			returns: "number",
			value: 0.5,
		},
	],
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

	const withParam: InjectFromLookupTable<"number"> = {
		...operation,
		operand: makeInjectedNumberArg,
	}

	expect(injectFromLookupTable(withParam)(some(100))).toEqual(right(some(0.5)))
})
