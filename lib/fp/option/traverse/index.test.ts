import { describe, test, expect } from "vitest"
import * as fc from "fast-check"
import { pipe } from "../../functions"
import traverse from "."
import some from "../some"

describe("Option traverse", () => {
	test("identity", () => {
		fc.assert(
			fc.property(fc.array(fc.anything()), as => {
				const result = pipe(as, pipe(some, traverse))

				expect(result).toEqual(some(as))
			}),
		)
	})
})
