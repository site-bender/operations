import { expect, test } from "vitest"

import invalidOperator from "."

test("returns void no matter what is passed", async () => {
	expect(invalidOperator(3)(2)).toBeUndefined()
	expect(invalidOperator(3)(3)).toBeUndefined()
	expect(invalidOperator(3)(4)).toBeUndefined()
})
