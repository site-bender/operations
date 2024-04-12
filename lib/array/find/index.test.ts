import { expect, test } from "vitest"
import { none, some } from "@sitebender/fp/lib/option"

import find from "."

const arr = [1, 2, 3, 4, 5]

test("returns the Some(item) when the item is found", () => {
	expect(find<number>(n => n === 3)(arr)).toStrictEqual(some(3))
	expect(find<number>(n => n > 1)(arr)).toStrictEqual(some(2))
})

test("returns None when the item is not found", () => {
	expect(find<number>(n => n === 0)(arr)).toStrictEqual(none)
})
