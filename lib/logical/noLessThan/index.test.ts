import { expect, test } from "vitest"

import noLessThan from "."

test("returns true when x and y are equal", async () => {
	expect(noLessThan(3)(3)).toStrictEqual(true)
})

test("returns true when x is more than y", async () => {
	expect(noLessThan(3)(2)).toStrictEqual(true)
})

test("returns false when x is less than y", async () => {
	expect(noLessThan(3)(4)).toStrictEqual(false)
})
