import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toSet from "."

test("[toSet] (casts::vector) converts string to set", () => {
	expect(toSet()("red,green,blue")).toEqual(
		some(new Set(["red", "green", "blue"])),
	)
})

test("[toSet] (casts::vector) converts string with passed separator to set", () => {
	expect(toSet("|")("red|green|blue")).toEqual(
		some(new Set(["red", "green", "blue"])),
	)
})

test("[toSet] (casts::vector) converts array to set", () => {
	expect(toSet()(["red", "green", "blue", "green"])).toEqual(
		some(new Set(["red", "green", "blue"])),
	)
})

test("[toSet] (casts::vector) passes set through unchanged", () => {
	const set = new Set([1, 2, 3, 4, 5])

	expect(toSet()(set)).toEqual(some(set))
})

test("[toSet] (casts::vector) returns none if parse fails", () => {
	// @ts-expect-error
	expect(toSet()()).toEqual(none)
	// @ts-expect-error
	expect(toSet()(0)).toEqual(none)
	// @ts-expect-error
	expect(toSet()(false)).toEqual(none)
	// @ts-expect-error
	expect(toSet()(null)).toEqual(none)
	// @ts-expect-error
	expect(toSet()(new Date())).toEqual(none)
	// @ts-expect-error
	expect(toSet()({})).toEqual(none)
	// @ts-expect-error
	expect(toSet()(new Map())).toEqual(none)
})
