import { test, expect } from "vitest"
import { AddOperation } from "../old/operations"
import makeInjectedNumber from "../operations/injected/makeInjectedConstant/makeInjectedNumer"
import makeCalculator from "."
import { Some, none, some } from "@sitebender/fp/lib/option"
import { SbAddOperation } from "../types"
import { right } from "@sitebender/fp/lib/either"
import injectedNumberArg from "../operations/injected/makeInjectedArgument/makeInjectedNumberArg"

test("[makeCalculator] (no input) creates a calculator function", () => {
	const op = (
		AddOperation({
			addends: [makeInjectedNumber(5), makeInjectedNumber(10)],
		}) as Some<SbAddOperation>
	).value

	const fn = makeCalculator(op)

	expect(fn()).toEqual(right(some(15)))
})

test("[makeCalculator] (with input) creates a calculator function", () => {
	const op = (
		AddOperation({
			addends: [makeInjectedNumber(5), injectedNumberArg],
		}) as Some<SbAddOperation>
	).value

	const fn = makeCalculator(op)

	expect(fn("10")).toEqual(right(some(15)))
	expect(fn()).toEqual(right(none))
})
