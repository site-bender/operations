import { left, right } from "@sitebender/fp/lib/either"
import { expect, test } from "vitest"

import evaluateNumericOperation from "."
import { some } from "@sitebender/fp/lib/option"
import makeNumericConstant from "../../../../constants/numericConstant"

test("works for add operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numeric-operation",
		addends: [makeNumericConstant(2), makeNumericConstant(3)],
		operation: "add",
	})

	expect(result()).toStrictEqual(right(some(5)))
})

test("works for divide operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numeric-operation",
		dividend: makeNumericConstant(12),
		divisor: makeNumericConstant(6),
		operation: "divide",
	})

	expect(result()).toStrictEqual(right(some(2)))
})

test("works for multiply operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numeric-operation",
		multipliers: [
			makeNumericConstant(2),
			makeNumericConstant(3),
			makeNumericConstant(4),
		],
		operation: "multiply",
	})

	expect(result()).toStrictEqual(right(some(24)))
})

test("works for negate operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numeric-operation",
		operand: makeNumericConstant(5),
		operation: "negate",
	})

	expect(result()).toStrictEqual(right(some(-5)))
})

test("works for power operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numeric-operation",
		base: makeNumericConstant(2),
		exponent: makeNumericConstant(5),
		operation: "power",
	})

	expect(result()).toStrictEqual(right(some(32)))
})

test("works for root operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numeric-operation",
		operation: "truncate",
		method: "round",
		operand: {
			_tag: "numeric-operation",
			index: makeNumericConstant(3),
			operation: "root",
			radicand: makeNumericConstant(64),
		},
	})

	expect(result()).toEqual(right(some(4)))
})

test("works for subtract operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numeric-operation",
		minuend: makeNumericConstant(10),
		operation: "subtract",
		subtrahend: makeNumericConstant(18),
	})

	expect(result()).toStrictEqual(right(some(-8)))
})

test("works for unrecognized operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numeric-operation",
		addends: [makeNumericConstant(2), makeNumericConstant(3)],
		// @ts-expect-error
		operation: "other",
	})

	expect(result()).toStrictEqual(left([`Invalid numeric operation: other.`]))
})
