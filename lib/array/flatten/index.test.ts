import { expect, test } from "vitest"

import flatten from "."

const arr = [1, [2, [3, [4, [5]]]]]

test("flattens one level deep when n is undefined", () => {
	// TODO: fix this type error
	// @ts-expect-error
	expect(flatten<number>()(arr)).toStrictEqual([1, 2, [3, [4, [5]]]])
})

test("flattens fully deep when n is Infinity (really only 20 levels)", () => {
	// TODO: fix this type error
	// @ts-expect-error
	expect(flatten<number>(Infinity)(arr)).toStrictEqual([1, 2, 3, 4, 5])
})

test("flattens n levels deep when n > 0 and n < depth", () => {
	// TODO: fix this type error
	// @ts-expect-error
	expect(flatten<number>(0)(arr)).toStrictEqual(arr)
	// @ts-expect-error
	expect(flatten<number>(1)(arr)).toStrictEqual([1, 2, [3, [4, [5]]]])
	// @ts-expect-error
	expect(flatten<number>(2)(arr)).toStrictEqual([1, 2, 3, [4, [5]]])
	// @ts-expect-error
	expect(flatten<number>(3)(arr)).toStrictEqual([1, 2, 3, 4, [5]])
})
