import { expect, test } from "vitest"
import { JSDOM } from "jsdom"
import { LiteralLookupOperation } from "../../types"
import lookup from "."
import { left, right } from "@sitebender/fp/lib/either"

const operation: LiteralLookupOperation = {
	operation: "literalLookup",
	operand: {
		operation: "formInput",
		name: "foo",
		returns: "string",
	},

	test: {
		red: "#f00",
		green: "#0f0",
		blue: "#00f",
	},
	returns: "string",
}

const dom = new JSDOM(
	`<!DOCTYPE html>
	<input name="foo" type="text" value="red">
`,
)

globalThis.document = dom.window.document

test("returns a failure for a non-existant key", () => {
	const failOperation = {
		...operation,
		test: {},
	}

	expect(lookup(failOperation)()).toEqual(left([`Not a valid lookup key: red`]))
})

test("returns a value for a mapped key", () => {
	expect(lookup(operation)()).toEqual(right("#f00"))
})
