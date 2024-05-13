import { type AddOperation } from "../../../types"

import { expect, test } from "vitest"
import { isLeft, left, right } from "@sitebender/fp/lib/either"
import { none, some } from "@sitebender/fp/lib/option"
import add from "."
import makeInjectedNumber from "../../../types/injected/makeInjectedConstant/makeInjectedNumer"
import injectedNumberArg from "../../../types/injected/makeInjectedArgument/makeInjectedNumberArg"

test("adds a set of numbers together", async () => {
	const success = add({
		_tag: "numericOperation",
		addends: [
			{
				addends: [makeInjectedNumber(3), makeInjectedNumber(4)],
				operation: "add",
				_tag: "numericOperation",
			},
			{
				_tag: "numericOperation",
				addends: [makeInjectedNumber(5), makeInjectedNumber(6)],
				operation: "add",
			},
			{
				_tag: "numericOperation",
				addends: [
					makeInjectedNumber(7),
					makeInjectedNumber(8),
					makeInjectedNumber(9),
				],
				operation: "add",
			},
		],
		operation: "add",
	})(none)

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(42)))
})

test("adds a set of numbers together with an input", async () => {
	const success = add({
		_tag: "numericOperation",
		addends: [
			injectedNumberArg,
			{
				_tag: "numericOperation",
				addends: [makeInjectedNumber(5), makeInjectedNumber(6)],
				operation: "add",
			},
			{
				_tag: "numericOperation",
				addends: [
					makeInjectedNumber(7),
					makeInjectedNumber(8),
					makeInjectedNumber(9),
				],
				operation: "add",
			},
		],
		operation: "add",
	})(some(3))

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(38)))
})

test("returns an error when one or more addends is an error", async () => {
	const failure = add({
		_tag: "numericOperation",
		addends: [
			{
				operation: "fail",
				returns: "error",
			} as unknown as AddOperation,
			{
				_tag: "numericOperation",
				addends: [makeInjectedNumber(5), makeInjectedNumber(6)],
				operation: "add",
			},
			{
				operation: "fail",
				returns: "error",
			} as unknown as AddOperation,
		],
		operation: "add",
	})(none)

	expect(isLeft(failure)).toBeTruthy()
	expect(failure).toStrictEqual(
		left([
			"Invalid numeric operation: fail.",
			"Invalid numeric operation: fail.",
		]),
	)
})
