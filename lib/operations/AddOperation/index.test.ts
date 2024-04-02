import { expect, test } from "vitest"
import { none, some } from "../../fp/option"

import AddOperation from "."

test("creates Some<AddOperation> from a config object", () => {
	const op1 = AddOperation({
		addends: [1, 2, 3],
	})
	const op2 = AddOperation({
		addends: [1, 2, 3],
		precision: 2,
		truncation: "round",
	})

	expect(op1).toStrictEqual(
		some({
			addends: [1, 2, 3],
			operation: "add",
			returns: "number",
		}),
	)

	expect(op2).toStrictEqual(
		some({
			addends: [1, 2, 3],
			operation: "add",
			precision: 2,
			returns: "number",
			truncation: "round",
		}),
	)
})

test("returns None if addends is empty or missing", () => {
	const op1 = AddOperation({})
	const op2 = AddOperation({ addends: [] })

	expect(op1).toStrictEqual(none)
	expect(op2).toStrictEqual(none)
})
