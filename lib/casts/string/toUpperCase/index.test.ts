import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toUpperCase from "."

test("[toArray] (casts::vector) casts string to Some(UpperCase)", () => {
	const s = "oh noes!"

	expect(toUpperCase(s)).toEqual(some("OH NOES!"))
	expect(toUpperCase("")).toEqual(some(""))
})

test("[toArray] (casts::vector) casts none when argument not a string", () => {
	// @ts-expect-error
	expect(toUpperCase(undefined)).toEqual(none)
	// @ts-expect-error
	expect(toUpperCase(null)).toEqual(none)
	// @ts-expect-error
	expect(toUpperCase(0)).toEqual(none)
	// @ts-expect-error
	expect(toUpperCase({})).toEqual(none)
	// @ts-expect-error
	expect(toUpperCase(true)).toEqual(none)
	// @ts-expect-error
	expect(toUpperCase([])).toEqual(none)
})
