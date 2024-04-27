import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toSentenceCase from "."

test("[toSentenceCase] (casts::string) casts string to Some(SentenceCase)", () => {
	const s = "bob's yer uncle"

	expect(toSentenceCase(s)).toEqual(some("Bob's yer uncle"))
	expect(toSentenceCase("")).toEqual(some(""))
})

test("[toSentenceCase] (casts::string) casts none when argument not a string", () => {
	// @ts-expect-error
	expect(toSentenceCase(undefined)).toEqual(none)
	// @ts-expect-error
	expect(toSentenceCase(null)).toEqual(none)
	// @ts-expect-error
	expect(toSentenceCase(0)).toEqual(none)
	// @ts-expect-error
	expect(toSentenceCase({})).toEqual(none)
	// @ts-expect-error
	expect(toSentenceCase(true)).toEqual(none)
	// @ts-expect-error
	expect(toSentenceCase([])).toEqual(none)
})
