import { expect, test } from "vitest"

import flatMap from "."

const arr = [1, 2, 3, 4, 5]

test("returns a new mapped array flattened", () => {
	expect(flatMap<number, number>(n => (n > 3 ? [n, 0] : n))(arr)).toStrictEqual(
		[1, 2, 3, 4, 0, 5, 0],
	)
})

test("flattens one level deep", () => {
	expect(
		// @ts-expect-error
		flatMap<number, number>(n => (n > 3 ? [n, [n * 2, n * 3]] : n))(arr),
	).toStrictEqual([1, 2, 3, 4, [8, 12], 5, [10, 15]])
})
