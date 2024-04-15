import { expect, test } from "vitest"
import { LiteralLookupOperation } from "../../types"
import lookup from "."
import { left, right } from "@sitebender/fp/lib/either"

const operation: LiteralLookupOperation = {
	operation: "literal-lookup",
	operand: {
		operation: "params",
		returns: "string",
	},

	test: {
		red: "#f00",
		green: "#0f0",
		blue: "#00f",
	},
	returns: "string",
}

const fn = lookup(operation)

test("returns a failure for a non-existant key", () => {
	expect(fn("yellow")).toEqual(left([`Not a valid lookup key: yellow`]))
})

test("returns a value for a mapped key", () => {
	expect(fn("red")).toEqual(right("#f00"))
})
