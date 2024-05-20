import {
	type SbInjectFromMap,
	SbNumericOperations,
	SbOperationTags,
	SbTernaryOperation,
} from "../types"

import evaluateTernaryOperation from "../operations/ternary/evaluateTernaryOperation"
import makeInjectedNumber from "../operations/injected/makeInjectedConstant/makeInjectedNumber"
import makeInjectedNumberFromForm from "../operations/injected/makeInjectedFromForm/makeInjectedNumberFromForm"
import makeMoreThan from "../operations/conditional/moreThan/makeMoreThan"
import makeTernaryOperation from "../operations/ternary/makeTernaryOperation"
import right from "@sitebender/fp/lib/either/right"
import some from "@sitebender/fp/lib/option/some"
import { JSDOM } from "jsdom"
import { expect, test } from "vitest"
import evaluateInjectableOperation from "../operations/injected/evaluateInjectableOperation"
import { none } from "@sitebender/fp/lib/option"
import makeLessThan from "../operations/conditional/lessThan/makelessThan";
import makeCalculator from "../makeCalculator";

test.skip("x > 0 ? max(y * x * j * k, 150) : 0", () => {
	const op = makeTernaryOperation({
		condition: makeMoreThan({
			operand: makeInjectedNumber(1),
			test: makeInjectedNumber(0),
		}),
		onTrue: {
			_tag: SbOperationTags.numeric,
			operation: SbNumericOperations.max,
			this: {
				_tag: SbOperationTags.numeric,
				operation: SbNumericOperations.multiply,
				multipliers: [
					makeInjectedNumber(1),
					makeInjectedNumber(1),
					makeInjectedNumber(1),
					makeInjectedNumber(1),
				],
			},
			that: makeInjectedNumber(150),
		},
		onFalse: makeInjectedNumber(0),
	})

	const result = evaluateTernaryOperation(op)()
	expect(result).toEqual(right(some(150)))
})

test.skip("publicLiabilityLookup", () => {
	const formula = "lookup(publicLiabilityLimit <= 1_000_000 ? 1_000_000 : publicLiabilityLimit), PublicLiabilityTable, col2))"
	const dom = new JSDOM(
		`<!DOCTYPE html>
	<input name="publicLiabilityLimit" type="text" value="50000">
`,
	)

	globalThis.document = dom.window.document

	const op: SbInjectFromMap<"number"> = {
		_tag: "injectorOperation",
		injectedDataType: "number",
		type: "map",
		column: makeInjectedNumber(2),
		operand: makeTernaryOperation({
			condition: makeLessThan({
				operand: makeInjectedNumberFromForm({ name: "publicLiabilityLimit" }),
				test: makeInjectedNumber(1_000_000),
			}),
			onTrue: {
				_tag: SbOperationTags.numeric,
				operation: SbNumericOperations.subtract,
				minuend: makeInjectedNumberFromForm({ name: "publicLiabilityLimit" }),
				subtrahend: makeInjectedNumber(1_000_000),
			},
			onFalse: makeInjectedNumber(0),
		}),
		test: {
			"0": [0],
			"1000000": [0],
			"2000000": [150],
			"3000000": [250],
			"4000000": [375],
			"5000000": [500],
			"6000000": [625],
			"7000000": [700],
			"8000000": [875],
			"9000000": [1000],
			"10000000": [1125],
		},
	}

	console.log(formula)
	console.log(JSON.stringify(op, null, 2))
	const result = evaluateInjectableOperation(op)(none)
	expect(result).toEqual(right(some(2)))
})

test.skip("ternary", () => {
	const dom = new JSDOM(
		`<!DOCTYPE html>
	<input name="publicLiabilityLimit" type="text" value="50000">
`,
	)

	globalThis.document = dom.window.document
	const calculation: SbTernaryOperation = {
		_tag: "ternaryOperation",
		condition: {
			_tag: "conditionalOperation",
			operation: "equalTo",
			operand: {
				_tag: "injectorOperation",
				injectedDataType: "number",
				type: "form",
				source: {
					name: "publicLiabilityLimit",
				},
			},
			test: {
				_tag: "injectorOperation",
				injectedDataType: "number",
				type: "constant",
				value: 0,
			},
		},
		onTrue: {
			_tag: "injectorOperation",
			injectedDataType: "number",
			type: "constant",
			value: 1_000_000,
		},
		onFalse: {
			_tag: "injectorOperation",
			injectedDataType: "number",
			type: "form",
			source: {
				name: "publicLiabilityLimit",
			},
		},
	}

	expect(makeCalculator(calculation)()).toEqual(right(some(50_000)))
})
