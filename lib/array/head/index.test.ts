import { expect, test } from "vitest"
import { none, some } from "@sitebender/fp/lib/option"

import head from "."

const arr = [1, 2, 3, 4, 5]

test("gets Some(head) when array length > 0", () => {
	expect(head(arr)).toStrictEqual(some(1))
})

test("gets None when the array is empty", () => {
	expect(head([])).toStrictEqual(none)
})
