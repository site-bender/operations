import { expect, test } from "vitest"

import toUpper from "."

const str = "Who IS tHe MAn?"

test("returns the locale lowercase version of the passed string", () => {
	expect(toUpper(str)).toStrictEqual("WHO IS THE MAN?")
})

test("works with empty strings", () => {
	expect(toUpper("")).toStrictEqual("")
})
