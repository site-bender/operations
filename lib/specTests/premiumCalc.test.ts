import {
	type SbInjectFromMap,
	SbNumericOperations,
	SbOperationTags,
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

test("lookup(x > 1_000_000 ? x - 1_000_000 : 0, LookupTable, 2)", () => {
	const dom = new JSDOM(
		`<!DOCTYPE html>
	<input name="x" type="text" value="50000">
`,
	)

	globalThis.document = dom.window.document

	const op: SbInjectFromMap<"number"> = {
		_tag: "injectorOperation",
		injectedDataType: "number",
		type: "map",
		column: makeInjectedNumber(2),
		operand: makeTernaryOperation({
			condition: makeMoreThan({
				operand: makeInjectedNumberFromForm({ name: "x" }),
				test: makeInjectedNumber(1_000_000),
			}),
			onTrue: {
				_tag: SbOperationTags.numeric,
				operation: SbNumericOperations.subtract,
				minuend: makeInjectedNumberFromForm({ name: "x" }),
				subtrahend: makeInjectedNumber(1_000_000),
			},
			onFalse: makeInjectedNumber(0),
		}),
		test: {
			"0": [1, 2],
			"1000000": [5, 6],
		},
	}

	console.log(JSON.stringify(op, null, 2))
	const result = evaluateInjectableOperation(op)(none)
	expect(result).toEqual(right(some(2)))
})
