import { Left, Right, isLeft } from "@sitebender/fp/lib/either"
import { expect, test } from "vitest"

import compareNumbers from "."

test("lessThan returns the value when it is less than the test", async () => {
	const success = compareNumbers({
		operand: 5,
		operation: "lessThan",
		returns: "boolean",
		test: 6,
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<number>).right).toEqual(5)
})

test("lessThan returns an error when it is not less than the test", async () => {
	const failure = compareNumbers({
		operand: 6,
		operation: "lessThan",
		returns: "boolean",
		test: 6,
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"6 is not lessThan 6.",
	])
})

test("moreThan returns the value when it is greater than the test", async () => {
	const success = compareNumbers({
		operand: 6,
		operation: "moreThan",
		returns: "boolean",
		test: 5,
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<number>).right).toEqual(6)
})

test("moreThan returns an error when it is not greater than the test", async () => {
	const failure = compareNumbers({
		operand: 6,
		operation: "moreThan",
		returns: "boolean",
		test: 6,
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"6 is not moreThan 6.",
	])
})

test("noMoreThan returns the value when it is no more than the test", async () => {
	const success = compareNumbers({
		operand: 6,
		operation: "noMoreThan",
		returns: "boolean",
		test: 6,
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<number>).right).toEqual(6)
})

test("noMoreThan returns an error when it is not no more than the test", async () => {
	const failure = compareNumbers({
		operand: 7,
		operation: "noMoreThan",
		returns: "boolean",
		test: 6,
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"7 is not noMoreThan 6.",
	])
})

test("noLessThan returns the value when it is no less than the test", async () => {
	const success = compareNumbers({
		operand: 6,
		operation: "noLessThan",
		returns: "boolean",
		test: 6,
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<number>).right).toEqual(6)
})

test("noLessThan returns an error when it is not no less than the test", async () => {
	const failure = compareNumbers({
		operand: 5,
		operation: "noLessThan",
		returns: "boolean",
		test: 6,
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"5 is not noLessThan 6.",
	])
})

test("equalTo returns the value when it is equal to the test", async () => {
	const success = compareNumbers({
		operand: 6,
		operation: "equalTo",
		returns: "boolean",
		test: 6,
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<number>).right).toEqual(6)
})

test("equalTo returns an error when it is not equal to the test", async () => {
	const failure = compareNumbers({
		operand: 5,
		operation: "equalTo",
		returns: "boolean",
		test: 6,
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual(["5 is not equalTo 6."])
})

test("unequalTo returns the value when it is unequal to the test", async () => {
	const success = compareNumbers({
		operand: 5,
		operation: "unequalTo",
		returns: "boolean",
		test: 6,
	})()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<number>).right).toEqual(5)
})

test("unequalTo returns an error when it is not unequal to the test", async () => {
	const failure = compareNumbers({
		operand: 6,
		operation: "unequalTo",
		returns: "boolean",
		test: 6,
	})()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"6 is not unequalTo 6.",
	])
})
