import { expect, test } from "vitest"

import trim from "."

const str = "       BOB!        "

test("returns the trimmed version of the passed string", () => {
	expect(trim(str)).toStrictEqual("BOB!")
})

test("works with empty strings", () => {
	expect(trim("")).toStrictEqual("")
})
