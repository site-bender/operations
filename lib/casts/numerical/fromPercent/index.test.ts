import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import fromPercent from "."

test("[fromPercent] (casts::numerical) converts string percent to a Some(number)", () => {
	expect(fromPercent("50.123%")).toEqual(some(5012.3))
})

test("[fromPercent] (casts::numerical) converts percent to a Some(number)", () => {
	expect(fromPercent(66.667)).toEqual(some(6666.7))
})

test("[fromPercent] (casts::numerical) returns none when does not parse to a number", () => {
	expect(fromPercent("xyz")).toEqual(none)
})
