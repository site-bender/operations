import { expect, test } from "vitest"

import isLeft from "@sitebender/fp/lib/either/isLeft"
import right from "@sitebender/fp/lib/either/right"
import some from "@sitebender/fp/lib/option/some"
import truncate from "."
import makeInjectedNumber from "../../../operations/injected/makeInjectedConstant/makeInjectedNumber"

test("truncate a number", async () => {
	const success = truncate({
		_tag: "numericOperation",
		method: "truncate",
		operand: makeInjectedNumber(99.999),
		operation: "truncate",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(99)))
})

test("round a number up", async () => {
	const success = truncate({
		_tag: "numericOperation",
		method: "round",
		operand: makeInjectedNumber(99.999),
		operation: "truncate",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(100)))
})

test("round a number down", async () => {
	const success = truncate({
		_tag: "numericOperation",
		method: "round",
		operand: makeInjectedNumber(99.456),
		operation: "truncate",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(99)))
})

test("round a number up to two decimal places", async () => {
	const success = truncate({
		_tag: "numericOperation",
		decimalPlaces: 2,
		method: "round",
		operand: makeInjectedNumber(99.966),
		operation: "truncate",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(99.97)))
})

test("round a number down to two decimal places", async () => {
	const success = truncate({
		_tag: "numericOperation",
		decimalPlaces: 2,
		method: "round",
		operand: makeInjectedNumber(99.454),
		operation: "truncate",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(99.45)))
})

test("get the floor of a number", async () => {
	const success = truncate({
		_tag: "numericOperation",
		method: "floor",
		operand: makeInjectedNumber(99.999),
		operation: "truncate",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(99)))
})

test("get the ceiling of a number", async () => {
	const success = truncate({
		_tag: "numericOperation",
		method: "ceiling",
		operand: makeInjectedNumber(99.999),
		operation: "truncate",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(100)))
})
