import { expect, test } from "vitest"

import isLeft from "@sitebender/fp/lib/either/isLeft"
import right from "@sitebender/fp/lib/either/right"
import some from "@sitebender/fp/lib/option/some"
import round from "."
import makeInjectedNumber from "../../../operations/injected/makeInjectedConstant/makeInjectedNumber"

test("round the number up", async () => {
	const success = round({
		_tag: "numericOperation",
		operand: makeInjectedNumber(99.999),
		operation: "round",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(100)))
})

test("round the number down", async () => {
	const success = round({
		_tag: "numericOperation",
		operand: makeInjectedNumber(99.123),
		operation: "round",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(99)))
})

test("round the number down to three decimal places", async () => {
	const success = round({
		_tag: "numericOperation",
		decimalPlaces: 3,
		operand: makeInjectedNumber(99.15732),
		operation: "round",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(99.157)))
})

test("round the number up to three decimal places", async () => {
	const success = round({
		_tag: "numericOperation",
		decimalPlaces: 3,
		operand: makeInjectedNumber(99.15792),
		operation: "round",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(99.158)))
})
