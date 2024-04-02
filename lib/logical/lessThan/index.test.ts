import { expect, test } from "vitest"

import lessThan from "."

test("returns true when x is less than y", async () => {
	expect(lessThan(3)(4)).toStrictEqual(true)
})

test("returns false when x and y are equal", async () => {
	expect(lessThan(3)(3)).toStrictEqual(false)
})

test("returns false when x more than y", async () => {
	expect(lessThan(3)(2)).toStrictEqual(false)
})
