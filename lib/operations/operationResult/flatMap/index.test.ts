import { describe, test, expect } from "vitest"
import * as fc from "fast-check"
import flatMap from "."
import { right } from "@sitebender/fp/lib/either"
import { some } from "@sitebender/fp/lib/option"
import { pipe } from "@sitebender/fp/lib/functions"

describe("SBOperation flatMap", () => {
	const f = (x: number) => right(some(x + 1))

	test("left identity", () => {
		fc.assert(
			fc.property(fc.integer(), value => {
				const pure = right(some(value))

				expect(pipe(pure, flatMap(f))).toEqual(f(value))
			}),
		)
	})

	test("right identity", () => {
		fc.assert(
			fc.property(fc.anything(), value => {
				const pure = right(some(value))

				expect(
					pipe(
						pure,
						flatMap(_ => right(some(_))),
					),
				).toEqual(pure)
			}),
		)
	})

	test("associativity", () => {
		fc.assert(
			fc.property(fc.integer(), a => {
				const pure = right(some(a))

				const lhs = pipe(pipe(pure, flatMap(f)), flatMap(f))
				const rhs = pipe(
					pure,
					flatMap(_ => pipe(f(_), flatMap(f))),
				)

				expect(lhs).toEqual(rhs)
			}),
		)
	})
})
