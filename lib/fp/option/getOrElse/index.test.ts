import { describe, expect, test } from "vitest"
import * as fc from "fast-check"
import { pipe } from "../../functions"
import getOrElse from "."
import some from "../some"
import none from "../none"

describe("Option getOrElse", () => {
	test("returns the some value", () => {
		fc.assert(
			fc.property(fc.anything(), fc.anything(), (value, alt) => {
				const result = pipe(
					some(value),
					getOrElse(() => alt),
				)

				expect(result).toEqual(value)
			}),
		)
	})

	test("returns the alt value for a left", () => {
		fc.assert(
			fc.property(fc.anything(), alt => {
				const result = pipe(
					none,
					getOrElse(() => alt),
				)

				expect(result).toEqual(alt)
			}),
		)
	})
})
