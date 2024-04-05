import { describe, test, expect } from "vitest"
import * as fc from "fast-check"
import { pipe } from "../../functions"
import match from "."
import some from "../some"
import none from "../none"

describe("Option match", () => {
	test("matches none", () => {
		fc.assert(
			fc.property(fc.anything(), fc.anything(), (onNone, onSome) => {
				const either = none

				const result = pipe(
					(_: any) => onSome,
					match(() => onNone),
				)(either)

				expect(result).toEqual(onNone)
			}),
		)
	})

	test("matches some", () => {
		fc.assert(
			fc.property(
				fc.anything(),
				fc.anything(),
				fc.anything(),
				(value, onNone, onSome) => {
					const either = some(value)

					const result = pipe(
						(_: any) => onSome,
						match(() => onNone),
					)(either)

					expect(result).toEqual(onSome)
				},
			),
		)
	})
})
