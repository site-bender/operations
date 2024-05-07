import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toMap from "."

const map = new Map([
	["red", "#f00"],
	["green", "#0f0"],
	["blue", "#00f"],
])

const accMap = new Map<string, string | Array<string>>([
	["red", "#f00"],
	["green", ["#0f0", "#0c0", "#090", "#060", "#030"]],
	["blue", "#00f"],
])

test("[toMap] (casts::vector) converts string to a Some(map)", () => {
	expect(toMap()()("red=#f00&green=#0f0&blue=#00f")).toEqual(some(map))
})

test("[toMap] (casts::vector) converts string with passed separator to Some(map)", () => {
	expect(toMap("|")(":")("red:#f00|green:#0f0|blue:#00f")).toEqual(some(map))
})

test("[toMap] (casts::vector) wraps a map in Some", () => {
	expect(toMap()()(map)).toEqual(some(map))
})

test("[toMap] (casts::vector) accumulates values in Some(map)", () => {
	expect(
		toMap()()(
			"red=#f00&green=#0f0&blue=#00f&green=#0c0&green=#090&green=#060&green=#030",
		),
	).toEqual(some(accMap))
})

test("[toMap] (casts::vector) returns none when parse fails", () => {
	// @ts-expect-error
	expect(toMap()()()).toEqual(none)
	// @ts-expect-error
	expect(toMap()()(0)).toEqual(none)
	// @ts-expect-error
	expect(toMap()()(false)).toEqual(none)
	// @ts-expect-error
	expect(toMap()()(null)).toEqual(none)
	// @ts-expect-error
	expect(toMap()()([])).toEqual(none)
	// @ts-expect-error
	expect(toMap()()(new Date())).toEqual(none)
	// @ts-expect-error
	expect(toMap()()({})).toEqual(none)
	// @ts-expect-error
	expect(toMap()()(new Set())).toEqual(none)
})
