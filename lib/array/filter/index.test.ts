import { expect, test } from "vitest"

import filter from "."

const arr = [1, 2, 3, 4, 5]

test("returns the full array when all items return true", () => {
	expect(filter<number>(n => n > 0)(arr)).toStrictEqual(arr)
})

test("returns a partial array when some items return true", () => {
	expect(filter<number>(n => n > 2)(arr)).toStrictEqual([3, 4, 5])
})

test("returns an empty array when all items return false", () => {
	expect(filter<number>(n => n > 5)(arr)).toStrictEqual([])
})
