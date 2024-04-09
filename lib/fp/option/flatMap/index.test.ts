import { describe, test, expect } from "vitest"
import * as fc from "fast-check"
import { pipe } from "../../functions"
import flatMap from "."
import some from "../some"

describe("Option flatMap", () => {
	const f = (x: number) => some(x + 1)

	test("left identity", () => {
		fc.assert(
			fc.property(fc.integer(), value => {
				const pure = some(value)

				expect(pipe(pure, flatMap(f))).toEqual(f(value))
			}),
		)
	})

	test("right identity", () => {
		fc.assert(
			fc.property(fc.anything(), value => {
				const pure = some(value)

				expect(pipe(pure, flatMap(some))).toEqual(pure)
			}),
		)
	})

	test("associativity", () => {
		fc.assert(
			fc.property(fc.integer(), a => {
				const pure = some(a)

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
