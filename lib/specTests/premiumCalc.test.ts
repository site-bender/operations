import {
	type SbInjectFromMap,
	SbInjectorType,
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
import makeCalculator from "../makeCalculator"
import makeNoMoreThan from "../operations/conditional/noMoreThan/makeNoMoreThan"
import makeInjectedNumberFromMap from "../operations/injected/makeInjectedFromMap/makeInjectedNumberFromMap"

test("x > 0 ? max(y * x * j * k, 150) : 0", () => {
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

test("publicLiabilityLookup", () => {
	const formula =
		"lookup(publicLiabilityLimit <= 1_000_000 ? 1_000_000 : publicLiabilityLimit), PublicLiabilityTable, col2))"
	const dom = new JSDOM(
		`<!DOCTYPE html>
	<input name="publicLiabilityLimit" type="text" value="5000000">
`,
	)

	globalThis.document = dom.window.document

	const op: SbInjectFromMap<"number"> = {
		_tag: "injectorOperation",
		injectedDataType: "number",
		type: "map",
		column: makeInjectedNumber(0),
		operand: makeTernaryOperation({
			condition: makeNoMoreThan({
				operand: makeInjectedNumberFromForm({ name: "publicLiabilityLimit" }),
				test: makeInjectedNumber(1_000_000),
			}),
			onTrue: makeInjectedNumber(1_000_000),
			onFalse: makeInjectedNumberFromForm({ name: "publicLiabilityLimit" }),
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
	expect(result).toEqual(right(some(500)))
})

test("ternary", () => {
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

test("limitMultiplier", () => {
	const formula =
		"lookup(professionalIndemnityLimit, LimitOfIndemnityTable, col2)"
	const dom = new JSDOM(
		`<!DOCTYPE html>
	<input name="publicLiabilityLimit" type="text" value="1000000">
`,
	)

	globalThis.document = dom.window.document

	const operation = makeInjectedNumberFromMap({
		column: makeInjectedNumber(0),
		operand: {
			_tag: SbOperationTags.injector,
			type: SbInjectorType.form,
			injectedDataType: "string",
			source: {
				name: "publicLiabilityLimit",
			},
		},
		test: {
			"0": [0],
			"250000": [375],
			"500000": [750],
			"1000000": [1500],
			"2000000": [2250],
			"3000000": [3000],
			"4000000": [3750],
		},
	})

	console.log(formula)
	console.log(JSON.stringify(operation, null, 2))
	const result = evaluateInjectableOperation(operation)(none)
	expect(result).toEqual(right(some(1500)))
})

test("excessMultiplier", () => {})
