import { expect, test } from "vitest"

import join from "."

const arr = ["bob", "is", "the", "bob", "of", "bobs"]

test("returns a string with the items in the array separated by the provided separator", () => {
	expect(join("")(arr)).toStrictEqual("bobisthebobofbobs")
	expect(join(" ")(arr)).toStrictEqual("bob is the bob of bobs")
	expect(join("-")(arr)).toStrictEqual("bob-is-the-bob-of-bobs")
	expect(join("!!!")(arr)).toStrictEqual("bob!!!is!!!the!!!bob!!!of!!!bobs")
})

test("returns an empty string when the array is empty", () => {
	expect(join("")([])).toStrictEqual("")
	expect(join(" ")([])).toStrictEqual("")
	expect(join("***")([])).toStrictEqual("")
})
