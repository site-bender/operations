import { expect, test } from "vitest"
import { none, some } from "../../fp/option"

import findLastIndex from "."

const arr = [1, 2, 3, 4, 5]

test("returns the Some(index) for the last item when found", () => {
	expect(findLastIndex<number>(n => n > 1)(arr)).toStrictEqual(some(4))
	expect(findLastIndex<number>(n => n > 1 && n < 5)(arr)).toStrictEqual(some(3))
})

test("returns None when the item is not found", () => {
	expect(findLastIndex<number>(n => n === 0)(arr)).toStrictEqual(none)
})
