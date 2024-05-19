import type { SbEqualTo } from "../types"

import injectedNumberArg from "../operations/injected/makeInjectedArgument/makeInjectedNumberArg"
import makeInjectedNumber from "../operations/injected/makeInjectedConstant/makeInjectedNumber"
import makeTernary from "."
import makeTernaryOperation from "../operations/ternary/makeTernaryOperation"
import none from "@sitebender/fp/lib/option/none"
import right from "@sitebender/fp/lib/either/right"
import some from "@sitebender/fp/lib/option/some"
import { test, expect } from "vitest"

const cond: SbEqualTo = {
	operation: "equalTo",
	_tag: "conditionalOperation",
	operand: makeInjectedNumber(5),
	test: makeInjectedNumber(5),
}
const onTrue = makeInjectedNumber(10)
const onFalse = makeInjectedNumber(20)
const op = makeTernaryOperation({ condition: cond, onTrue, onFalse })

test("[makeTernary] (no input) creates a ternary function", () => {
	const fn = makeTernary(op)

	expect(fn()).toEqual(right(some(10)))
})

test("[makeCalculator] (with input) creates a calculator function", () => {
	const op = makeTernaryOperation({
		condition: cond,
		onTrue: injectedNumberArg,
		onFalse,
	})
	const fn = makeTernary(op)

	expect(fn("60")).toEqual(right(some(60)))
	expect(fn()).toEqual(right(none))
})
