import { expect, test } from "vitest"
import { none, some } from "@sitebender/fp/lib/option"

import AddOperation from "."
import makeInjectedNumber from "../../../types/injected/makeInjectedConstant/makeInjectedNumer"

test("creates Some<AddOperation> from a config object", () => {
	const op1 = AddOperation({
		addends: [1, 2, 3].map(makeInjectedNumber),
	})
	const op2 = AddOperation({
		addends: [1, 2, 3].map(makeInjectedNumber),
		precision: makeInjectedNumber(2),
	})

	expect(op1).toStrictEqual(
		some({
			_tag: "numeric-operation",
			addends: [1, 2, 3].map(makeInjectedNumber),
			operation: "add",
		}),
	)

	expect(op2).toStrictEqual(
		some({
			_tag: "numeric-operation",
			addends: [1, 2, 3].map(makeInjectedNumber),
			operation: "add",
			precision: makeInjectedNumber(2),
		}),
	)
})

test("returns None if addends is empty or missing", () => {
	const op1 = AddOperation({})
	const op2 = AddOperation({ addends: [] })

	expect(op1).toStrictEqual(none)
	expect(op2).toStrictEqual(none)
})
