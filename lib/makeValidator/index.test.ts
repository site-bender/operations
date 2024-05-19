import { test, expect } from "vitest"
import makeInjectedNumber from "../operations/injected/makeInjectedConstant/makeInjectedNumber"
import { none, some } from "@sitebender/fp/lib/option"
import { left, right } from "@sitebender/fp/lib/either"
import makeValidator from "."
import makeLessThan from "../operations/conditional/lessThan/makelessThan"
import injectedNumberArg from "../operations/injected/makeInjectedArgument/makeInjectedNumberArg"

test("[makeValidation] (no input) creates a conditional function", () => {
	const op = makeLessThan({
		operand: makeInjectedNumber(5),
		test: makeInjectedNumber(10),
	})

	const fn = makeValidator(op)

	expect(fn()).toEqual(right(some(5)))
})

test("[makeValidation] (no input) returns a failure message for a failed validation", () => {
	const op = makeLessThan({
		operand: makeInjectedNumber(25),
		test: makeInjectedNumber(10),
	})

	const fn = makeValidator(op)

	expect(fn()).toEqual(left(["25 is not less than 10"]))
})

test("[makeValidation] (with input) creates a conditional function", () => {
	const op = makeLessThan({
		operand: makeInjectedNumber(5),
		test: injectedNumberArg,
	})
	const fn = makeValidator(op)

	expect(fn("10")).toEqual(right(some(5)))
	expect(fn()).toEqual(right(none))
})
