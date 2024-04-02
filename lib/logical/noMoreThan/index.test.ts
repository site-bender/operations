import { expect, test } from "vitest"

import equalTo from "."

test("returns true when x and y are equal", async () => {
	expect(equalTo(3)(3)).toStrictEqual(true)
})

test("returns true when x is less than y", async () => {
	expect(equalTo(3)(4)).toStrictEqual(true)
})

test("returns false when x is greater than y", async () => {
	expect(equalTo(3)(2)).toStrictEqual(false)
})
