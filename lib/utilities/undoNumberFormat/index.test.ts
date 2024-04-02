import { expect, test } from "vitest"

import undoNumberFormat from "."

test("removes Intl number formatting and returns the number", () => {
	const undoFormat = undoNumberFormat()

	expect(undoFormat("1,000,000.00")).toBe(1000000)
	expect(undoNumberFormat("en")("-1234.56")).toBe(-1234.56)
})

test("works for different locales", () => {
	const undoFormat = undoNumberFormat("de")

	expect(undoFormat("1.000.000,00")).toBe(1000000)
})

test("returns NaN unchanged when not a number", () => {
	const undoFormat = undoNumberFormat()

	expect(undoFormat("grizmo")).toBe(NaN)
})

test("works with numbers", () => {
	const undoFormat = undoNumberFormat()

	expect(undoFormat(1_234_567.89)).toBe(1234567.89)
	expect(undoNumberFormat("en-US")(1_234_567.89)).toBe(1234567.89)
})
