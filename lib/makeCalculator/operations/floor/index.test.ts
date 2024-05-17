import { expect, test } from "vitest"

import isLeft from "@sitebender/fp/lib/either/isLeft"
import right from "@sitebender/fp/lib/either/right"
import some from "@sitebender/fp/lib/option/some"
import floor from "."
import makeInjectedNumber from "../../../operations/injected/makeInjectedConstant/makeInjectedNumber"

test("get the floor of  number", async () => {
	const success = floor({
		_tag: "numericOperation",
		operand: makeInjectedNumber(99.999),
		operation: "floor",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(99)))
})
