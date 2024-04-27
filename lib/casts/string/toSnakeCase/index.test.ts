import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toSnakeCase from "."

test("[toSnakeCase] (casts::string) casts string to Some(TrainCase)", () => {
	const s = ' bob is "NOT" who-you-think-he-is, is he?  '

	expect(toSnakeCase(s)).toEqual(some("bob_is_not_who_you_think_he_is_is_he"))
	expect(toSnakeCase("")).toEqual(some(""))
})

test("[toSnakeCase] (casts::string) casts none when argument not a string", () => {
	// @ts-expect-error
	expect(toSnakeCase(undefined)).toEqual(none)
	// @ts-expect-error
	expect(toSnakeCase(null)).toEqual(none)
	// @ts-expect-error
	expect(toSnakeCase(0)).toEqual(none)
	// @ts-expect-error
	expect(toSnakeCase({})).toEqual(none)
	// @ts-expect-error
	expect(toSnakeCase(true)).toEqual(none)
	// @ts-expect-error
	expect(toSnakeCase([])).toEqual(none)
})
