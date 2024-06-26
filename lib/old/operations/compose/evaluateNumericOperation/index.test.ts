import { left, right } from "@sitebender/fp/lib/either"
import { expect, test } from "vitest"

import evaluateNumericOperation from "."
import { some } from "@sitebender/fp/lib/option"
import makeInjectedNumber from "../../../../operations/injected/makeInjectedConstant/makeInjectedNumber"

test("works for add operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numericOperation",
		addends: [makeInjectedNumber(2), makeInjectedNumber(3)],
		operation: "add",
	})

	expect(result()).toStrictEqual(right(some(5)))
})

test("works for divide operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numericOperation",
		dividend: makeInjectedNumber(12),
		divisor: makeInjectedNumber(6),
		operation: "divide",
	})

	expect(result()).toStrictEqual(right(some(2)))
})

test("works for multiply operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numericOperation",
		multipliers: [
			makeInjectedNumber(2),
			makeInjectedNumber(3),
			makeInjectedNumber(4),
		],
		operation: "multiply",
	})

	expect(result()).toStrictEqual(right(some(24)))
})

test("works for negate operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numericOperation",
		operand: makeInjectedNumber(5),
		operation: "negate",
	})

	expect(result()).toStrictEqual(right(some(-5)))
})

test("works for power operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numericOperation",
		base: makeInjectedNumber(2),
		exponent: makeInjectedNumber(5),
		operation: "power",
	})

	expect(result()).toStrictEqual(right(some(32)))
})

test("works for root operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numericOperation",
		operation: "truncate",
		method: "round",
		operand: {
			_tag: "numericOperation",
			index: makeInjectedNumber(3),
			operation: "root",
			radicand: makeInjectedNumber(64),
		},
	})

	expect(result()).toEqual(right(some(4)))
})

test("works for subtract operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numericOperation",
		minuend: makeInjectedNumber(10),
		operation: "subtract",
		subtrahend: makeInjectedNumber(18),
	})

	expect(result()).toStrictEqual(right(some(-8)))
})

test("works for unrecognized operations", async () => {
	const result = evaluateNumericOperation({
		_tag: "numericOperation",
		addends: [makeInjectedNumber(2), makeInjectedNumber(3)],
		// @ts-expect-error
		operation: "other",
	})

	expect(result()).toStrictEqual(left([`Invalid numeric operation: other.`]))
})
