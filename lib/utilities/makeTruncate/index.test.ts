import { expect, test } from "vitest"

import makeTruncate from "."

test("rounds number properly to precision 2", () => {
	expect(
		makeTruncate({ precision: 2, returns: "number", truncation: "round" })(
			3.1456,
		),
	).toBe(3.15)
})
