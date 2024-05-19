import { expect, test } from "vitest"
import makeTernaryOperation from "."
import makeInjectedNumber from "../../injected/makeInjectedConstant/makeInjectedNumber"
import { SbEqualTo, SbOperationTags } from "../../../types"

test("[makeTernaryOperation] creates a valid object", () => {
	const cond: SbEqualTo = {
		operation: "equalTo",
		_tag: "conditionalOperation",
		operand: makeInjectedNumber(5),
		test: makeInjectedNumber(5),
	}
	const onTrue = makeInjectedNumber(10)
	const onFalse = makeInjectedNumber(20)
	const op = makeTernaryOperation({ condition: cond, onTrue, onFalse })

	expect(op).toEqual({
		_tag: SbOperationTags.ternary,
		condition: cond,
		onTrue,
		onFalse,
	})
})
