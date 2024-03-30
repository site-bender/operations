import { expect, test } from "vitest"

import padStartTo from "."

test("pads the end of a string with the `padder` to `length`", () => {
	expect(padStartTo("-")(5)("bob")).toStrictEqual("--bob")
	expect(padStartTo("!")(10)("sam")).toStrictEqual("!!!!!!!sam")
})

test("returns the string unchanged if `padder` is empty string or `length` <= string.length", () => {
	expect(padStartTo("!")(5)("bob is bob")).toStrictEqual("bob is bob")
	expect(padStartTo("")(7)("sam")).toStrictEqual("sam")
})
