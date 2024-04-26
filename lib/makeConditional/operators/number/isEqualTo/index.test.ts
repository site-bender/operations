import { expect, test } from "vitest"

import isEqualTo from "."

test("[isEqualTo] (operators::number) returns true when x and y are equal", async () => {
	expect(isEqualTo(3)(3)).toStrictEqual(true)
})

test("[isEqualTo] (operators::number) returns false when x and y are unequal", async () => {
	expect(isEqualTo(3)(2)).toStrictEqual(false)
})
