import { expect, test } from "vitest"

import some from "."

const arr = [1, 2, 3, 4, 5]

test("returns true when all items return true", () => {
	expect(some<number>(n => n > 0)(arr)).toBeTruthy()
})

test("returns true when some items return true", () => {
	expect(some<number>(n => n > 2)(arr)).toBeTruthy()
})

test("returns true when one item returns true", () => {
	expect(some<number>(n => n === 2)(arr)).toBeTruthy()
})

test("returns false when all items return false", () => {
	expect(some<number>(n => n > 10)(arr)).toBeFalsy()
})
