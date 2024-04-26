import { expect, test } from "vitest"

import isNotEqualTo from "."

test("[isNotEqualTo] (operators::number) returns true when x and y are unequal", async () => {
	expect(isNotEqualTo(3)(2)).toStrictEqual(true)
})

test("[isNotEqualTo] (operators::number) returns false when x and y are equal", async () => {
	expect(isNotEqualTo(3)(3)).toStrictEqual(false)
})
