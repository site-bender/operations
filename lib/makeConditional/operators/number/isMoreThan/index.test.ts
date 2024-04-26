import { expect, test } from "vitest"

import isMoreThan from "."

test("[isMoreThan] (operators::number) returns true when x is more than y", async () => {
	expect(isMoreThan(3)(2)).toStrictEqual(true)
})

test("[isMoreThan] (operators::number) returns false when x and y are equal", async () => {
	expect(isMoreThan(3)(3)).toStrictEqual(false)
})

test("[isMoreThan] (operators::number) returns false when x is less than y", async () => {
	expect(isMoreThan(3)(4)).toStrictEqual(false)
})
