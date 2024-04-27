import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toString from "."

test("[toString] (casts::scalar) returns none for null or undefined", () => {
	expect(toString(undefined)).toEqual(none)
	expect(toString(null)).toEqual(none)
})

test("[toString] (casts::scalar) returns Some(string) for anything else", () => {
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

	expect(toString(0)).toEqual(some("0"))
	expect(toString(true)).toEqual(some("true"))
	expect(toString(arr)).toEqual(some("[1,2,3,4,5]"))
	expect(toString(map)).toEqual(some('[["bobs","yer"],["uncle","right?"]]'))
	expect(toString(obj)).toEqual(some('{"bobs":"yer","uncle":"right?"}'))
	expect(toString(set)).toEqual(some('["red","green","blue"]'))
})
