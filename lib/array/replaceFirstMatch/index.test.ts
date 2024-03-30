import { expect, test } from "vitest"
import toUpper from "../../string/toUpper"

import replaceFirstMatch from "."

const arr = ["bob", "is", "the", "bob", "of", "bobs"]

test("replaces all occurrences of the matched item with the f(original)", () => {
	expect(replaceFirstMatch(/bob/)(toUpper)(arr)).toStrictEqual([
		"BOB",
		"is",
		"the",
		"bob",
		"of",
		"bobs",
	])
	expect(replaceFirstMatch(/bob/)(() => "sally")(arr)).toStrictEqual([
		"sally",
		"is",
		"the",
		"bob",
		"of",
		"bobs",
	])
	expect(
		replaceFirstMatch(/bob/)(s => s.replace(/bob/, "sally"))(arr),
	).toStrictEqual(["sally", "is", "the", "bob", "of", "bobs"])
})

test("returns the array unchanged if match not found", () => {
	expect(replaceFirstMatch(/sally/)(toUpper)(arr)).toStrictEqual(arr)
})
