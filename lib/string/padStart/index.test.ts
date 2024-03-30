import { expect, test } from "vitest"

import padStart from "."

test("pads the start of a string with the `padder` repeated `times`", () => {
	expect(padStart("-")(5)("bob")).toStrictEqual("-----bob")
	expect(padStart(" *** ")(3)(" ~ ")).toStrictEqual(" ***  ***  ***  ~ ")
})

test("returns the string unchanged if `padder` is empty string or `times` < 1", () => {
	expect(padStart("")(5)("bob")).toStrictEqual("bob")
	expect(padStart("hi")(0)("sam")).toStrictEqual("sam")
})
