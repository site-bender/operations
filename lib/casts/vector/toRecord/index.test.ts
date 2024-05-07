import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toRecord from "."

test("[toRecord] (casts::vector) converts string to a record", () => {
	expect(toRecord()()("red=#f00&green=#0f0&blue=#00f")).toEqual(
		some({
			red: "#f00",
			green: "#0f0",
			blue: "#00f",
		}),
	)
})

test("[toRecord] (casts::vector) converts string with passed separator to record", () => {
	expect(toRecord("|")(":")("red:#f00|green:#0f0|blue:#00f")).toEqual(
		some({
			red: "#f00",
			green: "#0f0",
			blue: "#00f",
		}),
	)
})

test("[toRecord] (casts::vector) passes record through unchanged", () => {
	const record = {
		red: "#f00",
		green: "#0f0",
		blue: "#00f",
	}

	expect(toRecord()()(record)).toEqual(some(record))
})

test("[toRecord] (casts::vector) accumulates values", () => {
	expect(
		toRecord()()(
			"red=#f00&green=#0f0&blue=#00f&green=#0c0&green=#090&green=#060&green=#030",
		),
	).toEqual(
		some({
			red: "#f00",
			green: ["#0f0", "#0c0", "#090", "#060", "#030"],
			blue: "#00f",
		}),
	)
})

test("[toRecord] (casts:vector) returns none if fails to parse", () => {
	// @ts-expect-error
	expect(toRecord()()()).toEqual(none)
	// @ts-expect-error
	expect(toRecord()()(0)).toEqual(none)
	// @ts-expect-error
	expect(toRecord()()(false)).toEqual(none)
	// @ts-expect-error
	expect(toRecord()()(null)).toEqual(none)
	// @ts-expect-error
	expect(toRecord()()([])).toEqual(none)
	// @ts-expect-error
	expect(toRecord()()(new Date())).toEqual(none)
	// @ts-expect-error
	expect(toRecord()()(new Map())).toEqual(none)
	// @ts-expect-error
	expect(toRecord()()(new Set())).toEqual(none)
})
