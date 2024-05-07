import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toSnakeCase from "."

test("[toSnakeCase] (casts::string) casts string to Some(TrainCase)", () => {
	const s = ' bob is "NOT" who-you-think-he-is, is he?  '

	expect(toSnakeCase(s)).toEqual(some("BOB_IS_NOT_WHO_YOU_THINK_HE_IS_IS_HE"))
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
