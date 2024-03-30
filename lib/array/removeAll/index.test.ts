import { expect, test } from "vitest"

import remove from "."

const arr = [1, 2, 3, 4, 5]

test("removes the passed item from the array", () => {
	expect(remove<number>(1)(arr)).toStrictEqual([2, 3, 4, 5])
	expect(remove<number>(2)(arr)).toStrictEqual([1, 3, 4, 5])
	expect(remove<number>(3)(arr)).toStrictEqual([1, 2, 4, 5])
	expect(remove<number>(4)(arr)).toStrictEqual([1, 2, 3, 5])
	expect(remove<number>(5)(arr)).toStrictEqual([1, 2, 3, 4])
})

test("removes all occurrences of the passed item from the array", () => {
	expect(remove<number>(1)([1, 2, 1, 2, 1])).toStrictEqual([2, 2])
	expect(remove<number>(2)([1, 2, 1, 2, 1])).toStrictEqual([1, 1, 1])
})

test("returns the array unchanged if item not found", () => {
	expect(remove<number>(0)(arr)).toStrictEqual([1, 2, 3, 4, 5])
	expect(remove<number>(6)(arr)).toStrictEqual([1, 2, 3, 4, 5])
})
