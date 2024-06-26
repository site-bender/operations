import { Left, Right, isLeft } from "@sitebender/fp/lib/either"
import { expect, test } from "vitest"

import compareNumbers from "."
import { Some } from "@sitebender/fp/lib/option"
import makeInjectedNumber from "../../../operations/injected/makeInjectedConstant/makeInjectedNumber"
import makeLessThan from "../../../operations/conditional/lessThan/makelessThan"
import makeMoreThan from "../../../operations/conditional/moreThan/makeMoreThan"
import makeNoMoreThan from "../../../operations/conditional/noMoreThan/makeNoMoreThan"
import makeNoLessThan from "../../../operations/conditional/noLessThan/makeNoLessThan"
import makeEqualTo from "../../../operations/conditional/equalTo/makeEqualTo"
import makeUnequalTo from "../../../operations/conditional/unequalTo/makeUnequalTo"

test("lessThan returns the value when it is less than the test", async () => {
	const success = compareNumbers(
		makeLessThan({
			operand: makeInjectedNumber(5),
			test: makeInjectedNumber(6),
		}),
	)()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<Some<number>>).right.value).toEqual(5)
})

test("lessThan returns an error when it is not less than the test", async () => {
	const failure = compareNumbers(
		makeLessThan({
			operand: makeInjectedNumber(6),
			test: makeInjectedNumber(6),
		}),
	)()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"6 is not lessThan 6.",
	])
})

test("moreThan returns the value when it is greater than the test", async () => {
	const success = compareNumbers(
		makeMoreThan({
			operand: makeInjectedNumber(6),
			test: makeInjectedNumber(5),
		}),
	)()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<Some<number>>).right.value).toEqual(6)
})

test("moreThan returns an error when it is not greater than the test", async () => {
	const failure = compareNumbers(
		makeMoreThan({
			operand: makeInjectedNumber(6),
			test: makeInjectedNumber(6),
		}),
	)()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"6 is not moreThan 6.",
	])
})

test("noMoreThan returns the value when it is no more than the test", async () => {
	const success = compareNumbers(
		makeNoMoreThan({
			operand: makeInjectedNumber(6),
			test: makeInjectedNumber(6),
		}),
	)()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<Some<number>>).right.value).toEqual(6)
})

test("noMoreThan returns an error when it is not no more than the test", async () => {
	const failure = compareNumbers(
		makeNoMoreThan({
			operand: makeInjectedNumber(7),
			test: makeInjectedNumber(6),
		}),
	)()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"7 is not noMoreThan 6.",
	])
})

test("noLessThan returns the value when it is no less than the test", async () => {
	const success = compareNumbers(
		makeNoLessThan({
			operand: makeInjectedNumber(6),
			test: makeInjectedNumber(6),
		}),
	)()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<Some<number>>).right.value).toEqual(6)
})

test("noLessThan returns an error when it is not no less than the test", async () => {
	const failure = compareNumbers(
		makeNoLessThan({
			operand: makeInjectedNumber(5),
			test: makeInjectedNumber(6),
		}),
	)()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"5 is not noLessThan 6.",
	])
})

test("equalTo returns the value when it is equal to the test", async () => {
	const success = compareNumbers(
		makeEqualTo({
			operand: makeInjectedNumber(6),
			test: makeInjectedNumber(6),
		}),
	)()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<Some<number>>).right.value).toEqual(6)
})

test("equalTo returns an error when it is not equal to the test", async () => {
	const failure = compareNumbers(
		makeEqualTo({
			operand: makeInjectedNumber(5),
			test: makeInjectedNumber(6),
		}),
	)()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual(["5 is not equalTo 6."])
})

test("unequalTo returns the value when it is unequal to the test", async () => {
	const success = compareNumbers(
		makeUnequalTo({
			operand: makeInjectedNumber(5),
			test: makeInjectedNumber(6),
		}),
	)()

	expect(isLeft(success)).toBeFalsy()
	expect((success as Right<Some<number>>).right.value).toEqual(5)
})

test("unequalTo returns an error when it is not unequal to the test", async () => {
	const failure = compareNumbers(
		makeUnequalTo({
			operand: makeInjectedNumber(6),
			test: makeInjectedNumber(6),
		}),
	)()

	expect(isLeft(failure)).toBeTruthy()
	expect((failure as Left<Array<string>>).left).toEqual([
		"6 is not unequalTo 6.",
	])
})
