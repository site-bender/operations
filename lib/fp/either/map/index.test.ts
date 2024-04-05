import { describe, test, expect } from "vitest"
import * as fc from "fast-check"
import map from "."
import { identity } from "fp-ts/lib/function"
import right from "../right"
import { pipe } from "../../functions"

describe("Either map", () => {
	test("identity", () => {
		fc.assert(
			fc.property(fc.anything(), value => {
				const either = right(value)
				expect(map(identity)(either)).toEqual(either)
			}),
		)
	})

	test("composition", () => {
		fc.assert(
			fc.property(fc.integer(), value => {
				const inc = (n: number) => n + 1
				const some = right(value)

				const piped = pipe(some, map(inc), map(inc))

				const composed = pipe(
					some,
					map(n => inc(inc(n))),
				)

				expect(piped).toEqual(composed)
			}),
		)
	})
})
