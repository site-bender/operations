import { expect, test } from "vitest"

import dangIt from "."

const str1 = "bobity bob bob bobbers!"
const str2 = "sam is as sam does"

test("returns true if the regular expression is found in the string", () => {
	expect(dangIt(/bob/)(str1)).toBeTruthy
	expect(dangIt(/sam/)(str2)).toBeTruthy
})

test("returns false if no matches are found", () => {
	expect(dangIt(/blob/)(str1)).toBeFalsy()
	expect(dangIt(/scam/)(str2)).toBeFalsy()
})
