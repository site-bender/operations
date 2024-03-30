import { expect, test } from "vitest"

import trimStart from "."

const str = "       BOB!        "

test("returns the passed string with the left side trimmed", () => {
	expect(trimStart(str)).toStrictEqual("BOB!        ")
})

test("works with empty strings", () => {
	expect(trimStart("")).toStrictEqual("")
})
