import { expect, test } from "vitest"

import isLessThan from "."

test("[isLessThan] (number operators) returns true when x is less than y", async () => {
	expect(isLessThan(3)(4)).toStrictEqual(true)
})

test("[isLessThan] (number operators) returns false when x and y are equal", async () => {
	expect(isLessThan(3)(3)).toStrictEqual(false)
})

test("[isLessThan] (number operators) returns false when x more than y", async () => {
	expect(isLessThan(3)(2)).toStrictEqual(false)
})
