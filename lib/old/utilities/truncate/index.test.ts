import { expect, test } from "vitest"

import truncate from "."
import makeNumericConstant from "../../../constants/numericConstant"
import { right } from "@sitebender/fp/lib/either"
import { some } from "@sitebender/fp/lib/option"

test("rounds number properly to precision 2", () => {
	expect(
		truncate({
			_tag: "numeric-operation",
			operation: "truncate",
			precision: makeNumericConstant(2),
			method: "round",
			operand: {
				_tag: "numeric-operation",
				operation: "constant",
				value: 3.1456,
			},
		}),
	).toEqual(right(some(3.15)))
})

test("gets ceiling", () => {
	expect(
		truncate({
			_tag: "numeric-operation",
			operation: "truncate",
			precision: makeNumericConstant(0),
			method: "ceiling",
			operand: {
				_tag: "numeric-operation",
				operation: "constant",
				value: 3.0001,
			},
		}),
	).toEqual(right(some(4)))
})

test("gets floor", () => {
	expect(
		truncate({
			_tag: "numeric-operation",
			operation: "truncate",
			precision: makeNumericConstant(0),
			method: "floor",
			operand: {
				_tag: "numeric-operation",
				operation: "constant",
				value: 3.999,
			},
		}),
	).toEqual(right(some(3)))
})

test("truncates", () => {
	expect(
		truncate({
			_tag: "numeric-operation",
			operation: "truncate",
			precision: makeNumericConstant(0),
			method: "truncate",
			operand: {
				_tag: "numeric-operation",
				operation: "constant",
				value: 3.999,
			},
		}),
	).toEqual(right(some(3)))
})
