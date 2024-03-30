import { expect, test } from "vitest"
import { none, some } from "../../fp/option"

import findIndex from "."

const arr = [1, 2, 3, 4, 5]

test("returns the Some(index) when the item is found", () => {
	expect(findIndex<number>(n => n === 3)(arr)).toStrictEqual(some(2))
	expect(findIndex<number>(n => n > 1)(arr)).toStrictEqual(some(1))
})

test("returns None when the item is not found", () => {
	expect(findIndex<number>(n => n === 0)(arr)).toStrictEqual(none)
})
