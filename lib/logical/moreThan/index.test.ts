import { expect, test } from "vitest"

import moreThan from "."

test("returns true when x is more than y", async () => {
	expect(moreThan(3)(2)).toStrictEqual(true)
})

test("returns false when x and y are equal", async () => {
	expect(moreThan(3)(3)).toStrictEqual(false)
})

test("returns false when x is less than y", async () => {
	expect(moreThan(3)(4)).toStrictEqual(false)
})
