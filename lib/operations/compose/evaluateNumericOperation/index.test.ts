import { left, right } from "../../../fp/either"
import { some } from "../../../fp/option"
import { expect, test } from "vitest"

import evaluateNumericOperation from "."

test("works for add operations", async () => {
	const result = evaluateNumericOperation({
		addends: [2, 3],
		operation: "add",
		returns: "number",
	})

	expect(result()).toStrictEqual(right(some(5)))
})

test("works for divide operations", async () => {
	const result = evaluateNumericOperation({
		dividend: 12,
		divisor: 6,
		operation: "divide",
		returns: "number",
	})

	expect(result()).toStrictEqual(right(some(2)))
})

test("works for multiply operations", async () => {
	const result = evaluateNumericOperation({
		multipliers: [2, 3, 4],
		operation: "multiply",
		returns: "number",
	})

	expect(result()).toStrictEqual(right(some(24)))
})

test("works for negate operations", async () => {
	const result = evaluateNumericOperation({
		operand: 5,
		operation: "negate",
		returns: "number",
	})

	expect(result()).toStrictEqual(right(some(-5)))
})

test("works for power operations", async () => {
	const result = evaluateNumericOperation({
		base: 2,
		exponent: 5,
		operation: "power",
		returns: "number",
	})

	expect(result()).toStrictEqual(right(some(32)))
})

test("works for root operations", async () => {
	const result = evaluateNumericOperation({
		index: 3,
		operation: "root",
		radicand: 64,
		returns: "number",
		truncation: "round",
	})

	expect(result()).toEqual(right(some(4)))
})

test("works for subtract operations", async () => {
	const result = evaluateNumericOperation({
		minuend: 10,
		operation: "subtract",
		returns: "number",
		subtrahend: 18,
	})

	expect(result()).toStrictEqual(right(some(-8)))
})

test("works for unrecognized operations", async () => {
	const result = evaluateNumericOperation({
		addends: [2, 3],
		// @ts-expect-error
		operation: "other",
		returns: "number",
	})

	expect(result()).toStrictEqual(left([`Invalid numeric operation: other.`]))
})
