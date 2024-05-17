import { expect, test } from "vitest"

import isLeft from "@sitebender/fp/lib/either/isLeft"
import right from "@sitebender/fp/lib/either/right"
import some from "@sitebender/fp/lib/option/some"
import ceiling from "."
import makeInjectedNumber from "../../../operations/injected/makeInjectedConstant/makeInjectedNumber"

test("get the ceiling of  number", async () => {
	const success = ceiling({
		_tag: "numericOperation",
		operand: makeInjectedNumber(99.999),
		operation: "ceiling",
	})()

	expect(isLeft(success)).toBeFalsy()
	expect(success).toEqual(right(some(100)))
})
