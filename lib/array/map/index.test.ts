import { expect, test } from "vitest"

import map from "."

const arr = [1, 2, 3, 4, 5]

test("returns a new mapped array", () => {
	expect(map<number, number>(n => n * n)(arr)).toStrictEqual([1, 4, 9, 16, 25])
})

test("returns an empty array when the array is empty", () => {
	const empty = [] as Array<number>

	expect(map<number, number>(n => n * n)([])).toStrictEqual(empty)
	expect(map(n => n)([]) === empty).toBeFalsy() // new array
})
