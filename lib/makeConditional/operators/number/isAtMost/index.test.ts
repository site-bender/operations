import { expect, test } from "vitest"

import isAtMost from "."

test("[isAtMost] (operators::number) returns true when x and y are equal", async () => {
	expect(isAtMost(3)(3)).toStrictEqual(true)
})

test("[isAtMost] (operators::number) returns true when x is less than y", async () => {
	expect(isAtMost(3)(4)).toStrictEqual(true)
})

test("[isAtMost] (operators::number) returns false when x is greater than y", async () => {
	expect(isAtMost(3)(2)).toStrictEqual(false)
})
