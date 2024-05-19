import type { SbEqualTo } from "../../../types"

import evaluateTernaryOperation from "."
import makeInjectedNumber from "../../injected/makeInjectedConstant/makeInjectedNumber"
import makeTernaryOperation from "../makeTernaryOperation"
import right from "@sitebender/fp/lib/either/right"
import some from "@sitebender/fp/lib/option/some"
import { expect, test } from "vitest"
import injectedNumberArg from "../../injected/makeInjectedArgument/makeInjectedNumberArg"

test("[evaluateTernary] (no input) returns the true branch result", () => {
	const cond: SbEqualTo = {
		operation: "equalTo",
		_tag: "conditionalOperation",
		operand: makeInjectedNumber(5),
		test: makeInjectedNumber(5),
	}
	const onTrue = makeInjectedNumber(10)
	const onFalse = makeInjectedNumber(20)
	const op = makeTernaryOperation({ condition: cond, onTrue, onFalse })

	const result = evaluateTernaryOperation(op)()

	expect(result).toEqual(right(some(10)))
})

test("[evaluateTernary] (no input) returns the false branch result", () => {
	const cond: SbEqualTo = {
		operation: "equalTo",
		_tag: "conditionalOperation",
		operand: makeInjectedNumber(5),
		test: makeInjectedNumber(1),
	}
	const onTrue = makeInjectedNumber(10)
	const onFalse = makeInjectedNumber(20)
	const op = makeTernaryOperation({ condition: cond, onTrue, onFalse })

	const result = evaluateTernaryOperation(op)()

	expect(result).toEqual(right(some(20)))
})

test("[evaluateTernary] (with input) returns the correct branch result", () => {
	const cond: SbEqualTo = {
		operation: "equalTo",
		_tag: "conditionalOperation",
		operand: injectedNumberArg,
		test: makeInjectedNumber(5),
	}
	const onTrue = makeInjectedNumber(10)
	const onFalse = makeInjectedNumber(20)
	const op = makeTernaryOperation({ condition: cond, onTrue, onFalse })

	const fn = evaluateTernaryOperation(op)

	expect(fn(some(1))).toEqual(right(some(20)))
	expect(fn(some(5))).toEqual(right(some(10)))
})
