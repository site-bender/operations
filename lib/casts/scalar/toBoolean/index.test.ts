import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toBoolean from "."

test("[toBoolean] (casts::scalar) returns Some(true) for 'true' or 't'", () => {
	expect(toBoolean("True")).toEqual(some(true))
	expect(toBoolean("T")).toEqual(some(true))
})

test("[toBoolean] (casts::scalar) returns Some(false) for 'false' or 'f'", () => {
	expect(toBoolean("falSE")).toEqual(some(false))
	expect(toBoolean("f")).toEqual(some(false))
})

test("[toBoolean] (casts::scalar) returns none for any other string", () => {
	expect(toBoolean("grizmo")).toEqual(none)
	expect(toBoolean("")).toEqual(none)
})

test("[toBoolean] (casts::scalar) returns Some(true) for truthy values", () => {
	expect(toBoolean(1)).toEqual(some(true))
	expect(toBoolean([])).toEqual(some(true))
	expect(toBoolean({})).toEqual(some(true))
	expect(toBoolean(true)).toEqual(some(true))
})

test("[toBoolean] (casts::scalar) returns Some(false) for falsy values", () => {
	expect(toBoolean(0)).toEqual(some(false))
	expect(toBoolean(undefined)).toEqual(some(false))
	expect(toBoolean(null)).toEqual(some(false))
	expect(toBoolean(NaN)).toEqual(some(false))
})
