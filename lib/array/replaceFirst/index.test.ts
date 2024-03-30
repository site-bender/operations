import { expect, test } from "vitest"

import replaceFirst from "."

const arr = [1, 2, 3, 3, 3]

test("replaces the first occurrence of the passed item with the f(original)", () => {
	expect(replaceFirst<number>(1)(n => n * 3)(arr)).toStrictEqual([
		3, 2, 3, 3, 3,
	])
	expect(replaceFirst<number>(2)(n => n * 3)(arr)).toStrictEqual([
		1, 6, 3, 3, 3,
	])
	expect(replaceFirst<number>(3)(() => 77)(arr)).toStrictEqual([1, 2, 77, 3, 3])
})

test("returns the array unchanged if item not found", () => {
	expect(replaceFirst<number>(-1)(() => 0)(arr)).toStrictEqual([1, 2, 3, 3, 3])
})
