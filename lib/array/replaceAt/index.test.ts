import { expect, test } from "vitest"

import replaceAt from "."

const arr = [1, 2, 3, 4, 5]

test("replaces the item at index with the f(original)", () => {
	expect(replaceAt<number>(1)(n => n * 3)(arr)).toStrictEqual([1, 6, 3, 4, 5])
	expect(replaceAt<number>(2)(n => n * 3)(arr)).toStrictEqual([1, 2, 9, 4, 5])
	expect(replaceAt<number>(3)(() => 77)(arr)).toStrictEqual([1, 2, 3, 77, 5])
})

test("returns the array unchanged if item not found", () => {
	expect(replaceAt<number>(-1)(() => 0)(arr)).toStrictEqual([1, 2, 3, 4, 5])
	expect(replaceAt<number>(5)(() => 0)(arr)).toStrictEqual([1, 2, 3, 4, 5])
})
