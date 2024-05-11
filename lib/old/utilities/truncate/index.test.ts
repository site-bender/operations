import { expect, test } from "vitest"

import truncate from "."
import { right } from "@sitebender/fp/lib/either"
import { some } from "@sitebender/fp/lib/option"
import makeInjectedNumber from "../../../types/injected/makeInjectedConstant/makeInjectedNumer"

test("rounds number properly to precision 2", () => {
	expect(
		truncate({
			_tag: "numeric-operation",
			operation: "truncate",
			precision: makeInjectedNumber(2),
			method: "round",
			operand: makeInjectedNumber(3.1456),
		}),
	).toEqual(right(some(3.15)))
})

test("gets ceiling", () => {
	expect(
		truncate({
			_tag: "numeric-operation",
			operation: "truncate",
			precision: makeInjectedNumber(0),
			method: "ceiling",
			operand: makeInjectedNumber(3.0001),
		}),
	).toEqual(right(some(4)))
})

test("gets floor", () => {
	expect(
		truncate({
			_tag: "numeric-operation",
			operation: "truncate",
			precision: makeInjectedNumber(0),
			method: "floor",
			operand: makeInjectedNumber(3.999),
		}),
	).toEqual(right(some(3)))
})

test("truncates", () => {
	expect(
		truncate({
			_tag: "numeric-operation",
			operation: "truncate",
			precision: makeInjectedNumber(0),
			method: "truncate",
			operand: makeInjectedNumber(3.999),
		}),
	).toEqual(right(some(3)))
})
