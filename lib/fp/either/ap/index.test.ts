import { describe, expect, test } from "vitest"
import * as fc from "fast-check"
import pipe from "../../functions/pipe"
import right from "../right"
import ap from "."
import identity from "../../functions/identity"

describe("Either applicative", () => {
	const inc = (n: number) => n + 1

	test("identity", () => {
		fc.assert(
			fc.property(fc.integer(), value => {
				const some = right(value)
				const result = pipe(some, ap(right(identity<number>)))

				expect(result).toEqual(some)
			}),
		)
	})

	test("homomorphic - lift then combine, or combine and then lift", () => {
		// we can lift the func and the argument and then combine them
		// or we can combine them and then lift the result
		fc.assert(
			fc.property(fc.integer(), value => {
				const liftFirst = pipe(right(value), ap(right(inc)))

				const combineFirst = right(inc(value))

				expect(liftFirst).toEqual(combineFirst)
			}),
		)
	})

	test("interchange - applies rhs to lhs with no special handling", () => {
		// we can lift value and and apply it to the function in fab
		// or we can lift f => f(value) and apply the function in fab to that
		// i.e ap just applies the rhs to lhs; no special handling of either
		fc.assert(
			fc.property(fc.integer(), value => {
				const fab = right(inc)

				const liftValue = pipe(right(value), ap(fab))
				const liftFunction = pipe(
					fab,
					ap(right((f: (n: number) => number) => f(value))),
				)

				expect(liftValue).toEqual(liftFunction)
			}),
		)
	})
})
