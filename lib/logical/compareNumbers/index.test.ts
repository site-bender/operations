import type { Left, Right } from "fp-ts/lib/Either"
import { isLeft } from "fp-ts/lib/Either"
import { expect, test } from "vitest"

import compareNumbers from "."

test("lessThan returns the value when it is less than the test", async () => {
	const success = compareNumbers({
		operand: 5,
		operation: "lessThan",
		returns: "number",
		test: 6,
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<number>).right).toEqual(5)
})

test("lessThan returns an error when it is not less than the test", async () => {
	const failure = compareNumbers({
		operand: 6,
		operation: "lessThan",
		returns: "number",
		test: 6,
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Value 6 is not less than 6.",
	])
})

test("greaterThan returns the value when it is greater than the test", async () => {
	const success = compareNumbers({
		operand: 6,
		operation: "greaterThan",
		returns: "number",
		test: 5,
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<number>).right).toEqual(6)
})

test("greaterThan returns an error when it is not greater than the test", async () => {
	const failure = compareNumbers({
		operand: 6,
		operation: "greaterThan",
		returns: "number",
		test: 6,
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Value 6 is not greater than 6.",
	])
})

test("noMoreThan returns the value when it is no more than the test", async () => {
	const success = compareNumbers({
		operand: 6,
		operation: "noMoreThan",
		returns: "number",
		test: 6,
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<number>).right).toEqual(6)
})

test("noMoreThan returns an error when it is not no more than the test", async () => {
	const failure = compareNumbers({
		operand: 7,
		operation: "noMoreThan",
		returns: "number",
		test: 6,
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Value 7 is not at most 6.",
	])
})

test("noLessThan returns the value when it is no less than the test", async () => {
	const success = compareNumbers({
		operand: 6,
		operation: "noLessThan",
		returns: "number",
		test: 6,
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<number>).right).toEqual(6)
})

test("noLessThan returns an error when it is not no less than the test", async () => {
	const failure = compareNumbers({
		operand: 5,
		operation: "noLessThan",
		returns: "number",
		test: 6,
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Value 5 is not at least 6.",
	])
})

test("equalTo returns the value when it is equal to the test", async () => {
	const success = compareNumbers({
		operand: 6,
		operation: "equalTo",
		returns: "number",
		test: 6,
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<number>).right).toEqual(6)
})

test("equalTo returns an error when it is not equal to the test", async () => {
	const failure = compareNumbers({
		operand: 5,
		operation: "equalTo",
		returns: "number",
		test: 6,
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Value 5 is not equal to 6.",
	])
})

test("unequalTo returns the value when it is unequal to the test", async () => {
	const success = compareNumbers({
		operand: 5,
		operation: "unequalTo",
		returns: "number",
		test: 6,
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<number>).right).toEqual(5)
})

test("unequalTo returns an error when it is not unequal to the test", async () => {
	const failure = compareNumbers({
		operand: 6,
		operation: "unequalTo",
		returns: "number",
		test: 6,
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"Value 6 is not unequal to 6.",
	])
})
