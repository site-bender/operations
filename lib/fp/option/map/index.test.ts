import { describe, test, expect } from "vitest"
import * as fc from "fast-check"
import map from "."
import { identity, pipe } from "../../functions"
import some from "../some"

describe("Option map", () => {
	test("identity", () => {
		fc.assert(
			fc.property(fc.anything(), value => {
				const option = some(value)
				expect(map(identity)(option)).toEqual(option)
			}),
		)
	})

	test("composition", () => {
		fc.assert(
			fc.property(fc.integer(), value => {
				const inc = (n: number) => n + 1
				const option = some(value)

				const piped = pipe(option, map(inc), map(inc))

				const composed = pipe(
					option,
					map(n => inc(inc(n))),
				)

				expect(piped).toEqual(composed)
			}),
		)
	})
})
