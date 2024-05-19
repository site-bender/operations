import { type SbConditionalOperation, SbOperationTags } from "../../../types"

import { expect, test } from "vitest"
import evaluateConditionalNumericOperation from "."
import none from "@sitebender/fp/lib/option/none"
import left from "@sitebender/fp/lib/either/left"
import makeInjectedNumber from "../../injected/makeInjectedConstant/makeInjectedNumber"

test("[evaluateConditionalOperation] returns an error for unknown operation type", () => {
	const result = evaluateConditionalNumericOperation({
		_tag: SbOperationTags.conditional,
		operation: "oops",
		operand: makeInjectedNumber(1),
		test: makeInjectedNumber(1),
	} as any as SbConditionalOperation)

	expect(result(none)).toEqual(left(["Invalid numeric operation: oops."]))
})
