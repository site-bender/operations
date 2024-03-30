import { expect, test } from "vitest"

import removeAt from "."

const arr = [1, 2, 3, 4, 5]

test("removes the item at the passed from the array", () => {
	expect(removeAt<number>(0)(arr)).toStrictEqual([2, 3, 4, 5])
	expect(removeAt<number>(1)(arr)).toStrictEqual([1, 3, 4, 5])
	expect(removeAt<number>(2)(arr)).toStrictEqual([1, 2, 4, 5])
	expect(removeAt<number>(3)(arr)).toStrictEqual([1, 2, 3, 5])
	expect(removeAt<number>(4)(arr)).toStrictEqual([1, 2, 3, 4])
})

test("returns the array unchanged if index out of range or array empty", () => {
	const empty: Array<number> = []

	expect(removeAt<number>(-1)(arr)).toStrictEqual([1, 2, 3, 4, 5])
	expect(removeAt<number>(5)(arr)).toStrictEqual([1, 2, 3, 4, 5])
	expect(removeAt<number>(5)(arr) === arr).toBeFalsy() // new array
	expect(removeAt<number>(5)(empty) === empty).toBeFalsy() // new array
})
