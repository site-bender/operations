import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toNumber from "."

test("[toNumber] (casts::scalar) returns Some(number) if it parses", () => {
	expect(toNumber("123")).toEqual(some(123))
	expect(toNumber("-123")).toEqual(some(-123))
	expect(toNumber("123xxxx")).toEqual(some(123))
	expect(toNumber(0)).toEqual(some(0))
	expect(toNumber(1000n)).toEqual(some(1000))
})

test("[toNumber] (casts::scalar) returns none for anything else", () => {
	const arr = [1, 2, 3, 4, 5]
	const map = new Map([
		["bobs", "yer"],
		["uncle", "right?"],
	])
	const obj = {
		bobs: "yer",
		uncle: "right?",
	}
	const set = new Set(["red", "green", "blue", "red"])

	expect(toNumber("xxxx123")).toEqual(none)
	expect(toNumber(true)).toEqual(none)
	expect(toNumber(arr)).toEqual(none)
	expect(toNumber(map)).toEqual(none)
	expect(toNumber(obj)).toEqual(none)
	expect(toNumber(set)).toEqual(none)
})
