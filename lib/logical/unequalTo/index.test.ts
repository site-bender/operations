import { expect, test } from "vitest"

import unequalTo from "."

test("returns true when x and y are unequal", async () => {
	expect(unequalTo(3)(2)).toStrictEqual(true)
})

test("returns false when x and y are equal", async () => {
	expect(unequalTo(3)(3)).toStrictEqual(false)
})
