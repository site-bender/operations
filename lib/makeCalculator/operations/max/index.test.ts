import { SbNumericOperation } from "../../../types"

import { expect, test } from "vitest"
import isLeft from "@sitebender/fp/lib/either/isLeft"
import left from "@sitebender/fp/lib/either/left"
import right from "@sitebender/fp/lib/either/right"
import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"
import makeInjectedNumber from "../../../operations/injected/makeInjectedConstant/makeInjectedNumber"
import injectedNumberArg from "../../../operations/injected/makeInjectedArgument/makeInjectedNumberArg"
import max from "."

test("finds the max of two numbers", async () => {
	const success = max({
		_tag: "numericOperation",
		this: makeInjectedNumber(8),
		that: makeInjectedNumber(9),
		operation: "max",
	})(none)

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(9)))
})

test("finds the max of two numbers with an input", async () => {
	const success = max({
		_tag: "numericOperation",
		this: injectedNumberArg,
		that: makeInjectedNumber(9),
		operation: "max",
	})(some(50))

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(50)))
})

test("returns an error when one or more addends is an error", async () => {
	const failure = max({
		_tag: "numericOperation",
		this: { _tag: "error" } as any as SbNumericOperation,
		that: makeInjectedNumber(9),
		operation: "max",
	})(none)

	expect(isLeft(failure)).toBeTruthy()
	expect(failure).toStrictEqual(left(["Invalid numeric operation: unknown."]))
})
