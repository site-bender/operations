import { expect, test } from "vitest"
import { none, some } from "@sitebender/fp/lib/option"

import lastIndexOf from "."

const arr = [1, 2, 1, 2, 1, 2]

test("returns the Some(last index) when the item is found", () => {
	expect(lastIndexOf<number>(1)(arr)).toStrictEqual(some(4))
	expect(lastIndexOf<number>(2)(arr)).toStrictEqual(some(5))
})

test("returns None when the item is not found", () => {
	expect(lastIndexOf<number>(0)(arr)).toStrictEqual(none)
	expect(lastIndexOf<number>(3)(arr)).toStrictEqual(none)
})
