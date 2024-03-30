import { expect, test } from "vitest"

import all from "."

const arr = [1, 2, 3, 4, 5]

test("returns true when all items return true", () => {
	expect(all<number>(n => n > 0)(arr)).toBeTruthy()
})

test("returns false when any item returns false", () => {
	expect(all<number>(n => n > 1)(arr)).toBeFalsy()
})
