import { expect, test } from "vitest"

import padEndTo from "."

test("pads the end of a string with the `chars` to `length`", () => {
	expect(padEndTo("-")(5)("bob")).toStrictEqual("bob--")
	expect(padEndTo("!")(10)("sam")).toStrictEqual("sam!!!!!!!")
})

test("returns the string unchanged if `chars` is empty string or `length` <= string.length", () => {
	expect(padEndTo("!")(5)("bob is bob")).toStrictEqual("bob is bob")
	expect(padEndTo("")(7)("sam")).toStrictEqual("sam")
})
