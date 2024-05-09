import { expect, test } from "vitest"

import truncate from "."
import makeNumericConstant from "../../../constants/numericConstant"

test("rounds number properly to precision 2", () => {
	expect(
		truncate({
			precision: makeNumericConstant(2),
			returns: "number",
			truncation: "round",
		})(3.1456),
	).toBe(3.15)
})

test("gets ceiling", () => {
	expect(
		truncate({
			precision: makeNumericConstant(0),
			returns: "number",
			truncation: "ceiling",
		})(3.0001),
	).toBe(4)
})

test("gets floor", () => {
	expect(
		truncate({
			precision: makeNumericConstant(0),
			returns: "number",
			truncation: "floor",
		})(3.999),
	).toBe(3)
})

test("truncates", () => {
	expect(
		truncate({
			precision: makeNumericConstant(0),
			returns: "number",
			truncation: "truncate",
		})(3.999),
	).toBe(3)
})
