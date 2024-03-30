import { expect, test } from "vitest"

import toLower from "."

const str = "Who IS tHe MAn?"

test("returns the locale lowercase version of the passed string", () => {
	expect(toLower(str)).toStrictEqual("who is the man?")
})

test("works with empty strings", () => {
	expect(toLower("")).toStrictEqual("")
})
