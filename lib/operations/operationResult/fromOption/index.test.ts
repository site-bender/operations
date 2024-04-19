import { describe, test, expect } from "vitest"
import * as fc from "fast-check"
import fromOption from "."
import { none, some } from "@sitebender/fp/lib/option"
import { right } from "@sitebender/fp/lib/either"

describe("SBOperation fromOption", () => {
	test("some", () => {
		fc.assert(
			fc.property(fc.anything(), value => {
				const opt = some(value)
				expect(fromOption(opt)).toEqual(right(opt))
			}),
		)
	})

	test("none", () => {
		expect(fromOption(none)).toEqual(right(none))
	})
})
