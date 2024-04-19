import { describe, test, expect } from "vitest"
import * as fc from "fast-check"
import fromEither from "../fromEither"
import { left, right } from "@sitebender/fp/lib/either"
import { some } from "@sitebender/fp/lib/option"

describe("SBOperation fromEither", () => {
	test("right", () => {
		fc.assert(
			fc.property(fc.anything(), value => {
				const either = right(value)
				expect(fromEither(either)).toEqual(right(some(value)))
			}),
		)
	})

	test("left", () => {
		fc.assert(
			fc.property(fc.array(fc.string()), value => {
				const either = left(value)

				expect(fromEither(either)).toEqual(either)
			}),
		)
	})
})
