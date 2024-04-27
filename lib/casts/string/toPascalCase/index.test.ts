import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toPascalCase from "."

test("[toPascalCase] (casts::string) casts string to Some(PascalCase)", () => {
	const s = "   ^^^this-is'some. kind OF strange...shit!  "

	expect(toPascalCase(s)).toEqual(some("ThisIsSomeKindOfStrangeShit"))
	expect(toPascalCase("")).toEqual(some(""))
})

test("[toPascalCase] (casts::string) casts none when argument not a string", () => {
	// @ts-expect-error
	expect(toPascalCase(undefined)).toEqual(none)
	// @ts-expect-error
	expect(toPascalCase(null)).toEqual(none)
	// @ts-expect-error
	expect(toPascalCase(0)).toEqual(none)
	// @ts-expect-error
	expect(toPascalCase({})).toEqual(none)
	// @ts-expect-error
	expect(toPascalCase(true)).toEqual(none)
	// @ts-expect-error
	expect(toPascalCase([])).toEqual(none)
})
