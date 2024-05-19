import { expect, test } from "vitest"
import of from "."

test("[OperationResult] (of) creates a successful operation result", () => {
	expect(of(1)).toEqual({
		_tag: "Right",
		right: {
			_tag: "Some",
			value: 1,
		},
	})
})
