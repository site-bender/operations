import { expect, test } from "vitest"

import endsWith from "."

const str1 = "slack is good"
const str2 = "bob is the man"

test("returns true if the second string param ends with the first", () => {
	expect(endsWith("good")(str1)).toBeTruthy()
	expect(endsWith("the man")(str2)).toBeTruthy()
})

test("returns false if the second string param does not end with the first", () => {
	expect(endsWith("goob")(str1)).toBeFalsy()
	expect(endsWith("the mouse")(str2)).toBeFalsy()
})
