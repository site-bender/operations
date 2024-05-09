import { left, right } from "@sitebender/fp/lib/either"
import { expect, test } from "vitest"

import evaluateNumericOperation from "."
import { some } from "@sitebender/fp/lib/option"
import makeNumericConstant from "../../../../constants/numericConstant"

test("works for add operations", async () => {
	const result = evaluateNumericOperation({
		addends: [makeNumericConstant(2), makeNumericConstant(3)],
		operation: "add",
		returns: "number",
	})

	expect(result()).toStrictEqual(right(some(5)))
})

test("works for divide operations", async () => {
	const result = evaluateNumericOperation({
		dividend: makeNumericConstant(12),
		divisor: makeNumericConstant(6),
		operation: "divide",
		returns: "number",
	})

	expect(result()).toStrictEqual(right(some(2)))
})

test("works for multiply operations", async () => {
	const result = evaluateNumericOperation({
		multipliers: [
			makeNumericConstant(2),
			makeNumericConstant(3),
			makeNumericConstant(4),
		],
		operation: "multiply",
		returns: "number",
	})

	expect(result()).toStrictEqual(right(some(24)))
})

test("works for negate operations", async () => {
	const result = evaluateNumericOperation({
		operand: makeNumericConstant(5),
		operation: "negate",
		returns: "number",
	})

	expect(result()).toStrictEqual(right(some(-5)))
})

test("works for power operations", async () => {
	const result = evaluateNumericOperation({
		base: makeNumericConstant(2),
		exponent: makeNumericConstant(5),
		operation: "power",
		returns: "number",
	})

	expect(result()).toStrictEqual(right(some(32)))
})

test("works for root operations", async () => {
	const result = evaluateNumericOperation({
		index: makeNumericConstant(3),
		operation: "root",
		radicand: makeNumericConstant(64),
		returns: "number",
		truncation: "round",
	})

	expect(result()).toEqual(right(some(4)))
})

test("works for subtract operations", async () => {
	const result = evaluateNumericOperation({
		minuend: makeNumericConstant(10),
		operation: "subtract",
		returns: "number",
		subtrahend: makeNumericConstant(18),
	})

	expect(result()).toStrictEqual(right(some(-8)))
})

test("works for unrecognized operations", async () => {
	const result = evaluateNumericOperation({
		addends: [makeNumericConstant(2), makeNumericConstant(3)],
		// @ts-expect-error
		operation: "other",
		returns: "number",
	})

	expect(result()).toStrictEqual(left([`Invalid numeric operation: other.`]))
})
