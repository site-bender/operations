import { expect, test } from "vitest"

import isAtLeast from "."

test("[isAtLeast] (operators::number) returns true when x and y are equal", async () => {
	expect(isAtLeast(3)(3)).toStrictEqual(true)
})

test("[isAtLeast] (operators::number) returns true when x is more than y", async () => {
	expect(isAtLeast(3)(2)).toStrictEqual(true)
})

test("[isAtLeast] (operators::number) returns false when x is less than y", async () => {
	expect(isAtLeast(3)(4)).toStrictEqual(false)
})
