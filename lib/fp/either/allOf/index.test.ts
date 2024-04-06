import { describe, test, expect } from "vitest"
import * as fc from "fast-check"
import right from "../right"
import { pipe } from "../../functions"
import allOf from "."
import left from "../left"

describe("Either allOf", () => {
	test("successes", () => {
		fc.assert(
			fc.property(fc.array(fc.anything()), as => {
				const result = pipe(as, pipe(right, allOf))

				expect(result).toEqual(right(as))
			}),
		)
	})
	test("failures", () => {
		fc.assert(
			fc.property(fc.array(fc.anything(), { minLength: 1 }), as => {
				const result = pipe(
					as,
					pipe((a: any) => left([a]), allOf),
				)

				expect(result).toEqual(left(as))
			}),
		)
	})
})
