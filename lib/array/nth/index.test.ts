import { expect, test } from "vitest"
import { none, some } from "../../fp/option"

import nth from "."

const arr = [1, 2, 3, 4, 5]

test("returns the nth item as Some(item)", () => {
	expect(nth(0)(arr)).toStrictEqual(some(1))
	expect(nth(1)(arr)).toStrictEqual(some(2))
	expect(nth(2)(arr)).toStrictEqual(some(3))
	expect(nth(3)(arr)).toStrictEqual(some(4))
	expect(nth(4)(arr)).toStrictEqual(some(5))
})

test("returns None when the nth item not found", () => {
	expect(nth(-1)(arr)).toStrictEqual(none)
	expect(nth(5)(arr)).toStrictEqual(none)
})
