import { expect, test } from "vitest"

import equalTo from "."

test("returns true when x and y are equal", async () => {
	expect(equalTo(3)(3)).toStrictEqual(true)
})

test("returns false when x and y are unequal", async () => {
	expect(equalTo(3)(2)).toStrictEqual(false)
})
