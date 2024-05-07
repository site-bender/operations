import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toTitleCase from "."

test("[toTitleCase] (casts::string) casts string to Some(TitleCase)", () => {
	const s =
		"turning frowns (and smiles) upside down: a multilevel examination*** of surface acting positive and negative emotions on well-being"

	expect(toTitleCase(s)).toEqual(
		some(
			"Turning Frowns (and Smiles) Upside Down: a Multilevel Examination*** of Surface Acting Positive and Negative Emotions on Well-Being",
		),
	)
	expect(toTitleCase("")).toEqual(some(""))
	expect(toTitleCase("and? i'll give 'em what for!")).toEqual(
		some("And? I'll Give 'em What For!"),
	)
})

test("[toTitleCase] (casts::string) casts none when argument not a string", () => {
	// @ts-expect-error
	expect(toTitleCase(undefined)).toEqual(none)
	// @ts-expect-error
	expect(toTitleCase(null)).toEqual(none)
	// @ts-expect-error
	expect(toTitleCase(0)).toEqual(none)
	// @ts-expect-error
	expect(toTitleCase({})).toEqual(none)
	// @ts-expect-error
	expect(toTitleCase(true)).toEqual(none)
	// @ts-expect-error
	expect(toTitleCase([])).toEqual(none)
})
