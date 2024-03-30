import { expect, test } from "vitest"
import { none, some } from "../../fp/option"

import lastIndexOfMatch from "."

const arr = ["bob", "is", "the", "bob", "of", "bobs"]

test("returns the Some(last index) when the match is found", () => {
	expect(lastIndexOfMatch(/bob/)(arr)).toStrictEqual(some(5))
	expect(lastIndexOfMatch(/bobs/)(arr)).toStrictEqual(some(5))
	expect(lastIndexOfMatch(/is/)(arr)).toStrictEqual(some(1))
})

test("returns None when the item is not found", () => {
	expect(lastIndexOfMatch(/joe/)(arr)).toStrictEqual(none)
})
