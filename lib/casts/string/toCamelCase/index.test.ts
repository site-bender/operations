import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toCamelCase from "."

test("[toCamelCase] (casts::string) casts string to Some(CamelCase)", () => {
	const s = "   ^^^this-is'some. kind OF strange...shit!  "

	expect(toCamelCase(s)).toEqual(some("thisIsSomeKindOfStrangeShit"))
	expect(toCamelCase("")).toEqual(some(""))
})

test("[toCamelCase] (casts::string) casts none when argument not a string", () => {
	// @ts-expect-error
	expect(toCamelCase(undefined)).toEqual(none)
	// @ts-expect-error
	expect(toCamelCase(null)).toEqual(none)
	// @ts-expect-error
	expect(toCamelCase(0)).toEqual(none)
	// @ts-expect-error
	expect(toCamelCase({})).toEqual(none)
	// @ts-expect-error
	expect(toCamelCase(true)).toEqual(none)
	// @ts-expect-error
	expect(toCamelCase([])).toEqual(none)
})
