import { describe, expect, test } from "vitest"
import * as fc from "fast-check"
import right from "../right"
import { pipe } from "../../functions"
import getOrElse from "."
import left from "../left"

describe("Either getOrElse", () => {
	test("returns the right value", () => {
		fc.assert(
			fc.property(fc.anything(), fc.anything(), (value, alt) => {
				const result = pipe(
					right(value),
					getOrElse(() => alt),
				)

				expect(result).toEqual(value)
			}),
		)
	})

	test("returns the alt value for a left", () => {
		fc.assert(
			fc.property(fc.anything(), fc.anything(), (value, alt) => {
				const result = pipe(
					left(value),
					getOrElse(() => alt),
				)

				expect(result).toEqual(alt)
			}),
		)
	})
})
