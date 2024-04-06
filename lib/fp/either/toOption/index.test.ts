import { describe, test, expect } from "vitest"
import * as fc from "fast-check"
import right from "../right"
import left from "../left"
import toOption from "."
import { none, some } from "../../option"

describe("Either toOption", () => {
	test("returns none for a left", () => {
		fc.assert(
			fc.property(fc.anything(), value => {
				expect(toOption(left(value))).toEqual(none)
			}),
		)
	})

	test("returns some for a right", () => {
		fc.assert(
			fc.property(fc.anything(), value => {
				expect(toOption(right(value))).toEqual(some(value))
			}),
		)
	})
})
