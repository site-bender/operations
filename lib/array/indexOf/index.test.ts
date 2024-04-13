import { expect, test } from "vitest"
import { none, some } from "@sitebender/fp/lib/option"

import indexOf from "."

const arr = [1, 2, 3, 4, 5]

test("returns the Some(index) when the item is found", () => {
	expect(indexOf<number>(1)(arr)).toStrictEqual(some(0))
	expect(indexOf<number>(2)(arr)).toStrictEqual(some(1))
	expect(indexOf<number>(3)(arr)).toStrictEqual(some(2))
	expect(indexOf<number>(4)(arr)).toStrictEqual(some(3))
	expect(indexOf<number>(5)(arr)).toStrictEqual(some(4))
})

test("returns None when the item is not found", () => {
	expect(indexOf<number>(0)(arr)).toStrictEqual(none)
	expect(indexOf<number>(6)(arr)).toStrictEqual(none)
})
