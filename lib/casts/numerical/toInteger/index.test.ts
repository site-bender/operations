import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toInteger from "."

test("[toInteger] (casts::numerical) converts string integer to Some(number)", () => {
	expect(toInteger("123")).toEqual(some(123))
})

test("[toInteger] (casts::numerical) converts an integer to Some(number)", () => {
	expect(toInteger(123)).toEqual(some(123))
})

test("[toInteger] (casts::numerical) returns none for anything else", () => {
	expect(toInteger(123.456)).toEqual(none)
	expect(toInteger("123.456")).toEqual(none)
	expect(toInteger("xyz")).toEqual(none)
})

test("[toInteger] (casts::numerical) works with bigints", () => {
	expect(toInteger(123n)).toEqual(some(123n))
	expect(toInteger("123n")).toEqual(some(123n))
})
