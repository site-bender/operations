import {
	InjectorSource,
	OperationTags,
	type InjectFromMap,
} from "../../../types"

import { expect, test } from "vitest"
import { JSDOM } from "jsdom"

import right from "@sitebender/fp/lib/either/right"
import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import injectFromMap from "."
import makeInjectedStringArg from "../../../types/injected/makeInjectedArgument/makeInjectedStringArg"

const operation: InjectFromMap<"string"> = {
	_tag: OperationTags.injector,
	injectedDataType: "string",
	operand: {
		_tag: OperationTags.injector,
		injectedDataType: "string",
		source: InjectorSource.form,
		field: "foo",
	},
	source: InjectorSource.map,
	test: {
		red: "#f00",
		green: "#0f0",
		blue: "#00f",
	},
}

const dom = new JSDOM(
	`<!DOCTYPE html>
	<input name="foo" type="text" value="red">
`,
)

globalThis.document = dom.window.document

test("[injectFromMap] (injectors) returns a failure for a non-existant key", () => {
	const failOperation = {
		...operation,
		test: {},
	}

	expect(injectFromMap(failOperation)()).toEqual(right(none))
})

test("[injectFromMap] (injectors) returns a value for a mapped key", () => {
	expect(injectFromMap(operation)()).toEqual(right(some("#f00")))
})

test("[injectFromMap] (injectors) returns a value for a mapped key from an input", () => {
	const withParam: InjectFromMap<"string"> = {
		...operation,
		operand: makeInjectedStringArg,
	}
	expect(injectFromMap(withParam)(some("red"))).toEqual(right(some("#f00")))
})
