import { describe, test, expect } from "vitest"
import * as fc from "fast-check"
import right from "../right"
import { pipe } from "../../functions"
import left from "../left"
import match from "."

describe("Either match", () => {
	test("matches left", () => {
		fc.assert(
			fc.property(
				fc.anything(),
				fc.anything(),
				fc.anything(),
				(value, onLeft, onRight) => {
					const either = left(value)

					const result = pipe(
						(_: any) => onRight,
						match(_ => onLeft),
					)(either)

					expect(result).toEqual(onLeft)
				},
			),
		)
	})

	test("matches right", () => {
		fc.assert(
			fc.property(
				fc.anything(),
				fc.anything(),
				fc.anything(),
				(value, onLeft, onRight) => {
					const either = right(value)

					const result = pipe(
						(_: any) => onRight,
						match(_ => onLeft),
					)(either)

					expect(result).toEqual(onRight)
				},
			),
		)
	})
})
