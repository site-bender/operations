import { test, expect } from "vitest"
import makeInjectedNumber from "../operations/injected/makeInjectedConstant/makeInjectedNumer"
import makeCalculator from "."
import { none, some } from "@sitebender/fp/lib/option"
import { right } from "@sitebender/fp/lib/either"
import makeConditional from "."
import makeLessThan from "../operations/conditional/lessThan/makelessThan"
import injectedNumberArg from "../operations/injected/makeInjectedArgument/makeInjectedNumberArg";

test("[makeConditional] (no input) creates a conditional function", () => {
	const op = makeLessThan({
		operand: makeInjectedNumber(5),
		test: makeInjectedNumber(10),
	})

	const fn = makeConditional(op)

	expect(fn()).toEqual(right(some(true)))
})

test("[makeConditional] (with input) creates a conditional function", () => {
	const op = makeLessThan({
		operand: makeInjectedNumber(5),
		test: injectedNumberArg,
	})
	const fn = makeCalculator(op)

	expect(fn("10")).toEqual(right(some(true)))
	expect(fn()).toEqual(right(none))
})
