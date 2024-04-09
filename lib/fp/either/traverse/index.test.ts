import { describe, test, expect } from "vitest"
import * as fc from "fast-check"
import right from "../right"
import { pipe } from "../../functions"
import traverse from "."

describe("Either traverse", () => {
	test("identity", () => {
		fc.assert(
			fc.property(fc.array(fc.anything()), as => {
				const result = pipe(as, pipe(right, traverse))

				expect(result).toEqual(right(as))
			}),
		)
	})

	test("transforms value", () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), as => {
				const result = pipe(
					as,
					pipe((n: number) => right(String(n)), traverse),
				)

				expect(result).toEqual(right(as.map(n => String(n))))
			}),
		)
	})
})
