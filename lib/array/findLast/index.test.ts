import { expect, test } from "vitest"
import { none, some } from "../../fp/option"

import findIndex from "."

const arr = [1, 2, 3, 4, 5]

test("returns the Some(item) for the last item when found", () => {
	expect(findIndex<number>(n => n > 1)(arr)).toStrictEqual(some(5))
	expect(findIndex<number>(n => n > 1 && n < 5)(arr)).toStrictEqual(some(4))
})

test("returns None when the item is not found", () => {
	expect(findIndex<number>(n => n === 0)(arr)).toStrictEqual(none)
})
