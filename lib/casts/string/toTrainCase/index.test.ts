import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toTrainCase from "."

test("[toTrainCase] (casts::string) casts string to Some(TrainCase)", () => {
	const s = ' bob is "NOT" who-you-think-he-is, is he?  '

	expect(toTrainCase(s)).toEqual(some("bob-is-not-who-you-think-he-is-is-he"))
	expect(toTrainCase("")).toEqual(some(""))
})

test("[toTrainCase] (casts::string) casts none when argument not a string", () => {
	// @ts-expect-error
	expect(toTrainCase(undefined)).toEqual(none)
	// @ts-expect-error
	expect(toTrainCase(null)).toEqual(none)
	// @ts-expect-error
	expect(toTrainCase(0)).toEqual(none)
	// @ts-expect-error
	expect(toTrainCase({})).toEqual(none)
	// @ts-expect-error
	expect(toTrainCase(true)).toEqual(none)
	// @ts-expect-error
	expect(toTrainCase([])).toEqual(none)
})
