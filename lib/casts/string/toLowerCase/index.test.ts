import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toLowerCase from "."

test("[toArray] (casts::string) casts string to Some(LowerCase)", () => {
	const s = "OH NOES!"

	expect(toLowerCase(s)).toEqual(some("oh noes!"))
	expect(toLowerCase("")).toEqual(some(""))
})

test("[toArray] (casts::string) casts none when argument not a string", () => {
	// @ts-expect-error
	expect(toLowerCase(undefined)).toEqual(none)
	// @ts-expect-error
	expect(toLowerCase(null)).toEqual(none)
	// @ts-expect-error
	expect(toLowerCase(0)).toEqual(none)
	// @ts-expect-error
	expect(toLowerCase({})).toEqual(none)
	// @ts-expect-error
	expect(toLowerCase(true)).toEqual(none)
	// @ts-expect-error
	expect(toLowerCase([])).toEqual(none)
})
