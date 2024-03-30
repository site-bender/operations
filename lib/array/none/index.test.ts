import { expect, test } from "vitest"

import none from "."

const arr = [1, 2, 3, 4, 5]

test("returns true when no item return true", () => {
	expect(none<number>(n => n < 1)(arr)).toBeTruthy()
})

test("returns false when any item returns true", () => {
	expect(none<number>(n => n < 2)(arr)).toBeFalsy()
	expect(none<number>(n => n < 6)(arr)).toBeFalsy()
})
