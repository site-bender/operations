import { SbNumericOperation } from "../types"
import makeInjectedNumberFromForm from "../operations/injected/makeInjectedFromForm/makeInjectedNumberFromForm"
import { JSDOM } from "jsdom"
import { expect, test } from "vitest"
import evaluateNumericOperation from "../old/operations/compose/evaluateNumericOperation"
import { some } from "@sitebender/fp/lib/option"
import { right } from "@sitebender/fp/lib/either"
const dom = new JSDOM(
	`<!DOCTYPE html>
	<input name="inputA" type="text" value="7">
	<input name="inputB" type="text" value="14">
	<input name="inputC" type="text" value="9">
	<input name="inputD" type="text" value="3">
	<input name="inputE" type="text" value="20">
`,
)

globalThis.document = dom.window.document

const calculation: SbNumericOperation = {
	_tag: "numericOperation",
	dividend: {
		_tag: "numericOperation",
		addends: [
			makeInjectedNumberFromForm({ name: "inputA", tagName: "INPUT" }),
			makeInjectedNumberFromForm({ name: "inputB", tagName: "INPUT" }),
		],
		operation: "add",
	},
	divisor: {
		_tag: "numericOperation",
		minuend: {
			_tag: "numericOperation",
			multipliers: [
				makeInjectedNumberFromForm({ name: "inputC", tagName: "INPUT" }),
				makeInjectedNumberFromForm({ name: "inputD", tagName: "INPUT" }),
			],
			operation: "multiply",
		},
		operation: "subtract",
		subtrahend: makeInjectedNumberFromForm({
			name: "inputE",
			tagName: "INPUT",
		}),
	},
	operation: "divide",
}

test("Numeric calculation from form inputs", () => {
	expect(evaluateNumericOperation(calculation)()).toEqual(right(some(3)))
})
