import { expect, test } from "vitest"
import { none, some } from "@sitebender/fp/lib/option"

import last from "."

const arr = [1, 2, 3, 4, 5]

test("gets Some(last) when array length > 0", () => {
	expect(last(arr)).toStrictEqual(some(5))
})

test("gets None when the array is empty", () => {
	expect(last([])).toStrictEqual(none)
})
