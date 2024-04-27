import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toArray from "."

test("[toArray] (casts::vector) converts string to Some(array)", () => {
	expect(toArray()("red,green,blue")).toEqual(some(["red", "green", "blue"]))
})

test("[toArray] (casts::vector) converts string with passed separator to Some(array)", () => {
	expect(toArray("|")("red|green|blue")).toEqual(some(["red", "green", "blue"]))
})

test("[toArray] (casts::vector) wraps passed array in Some", () => {
	const arr = [1, 2, 3, 4, 5]

	expect(toArray()(arr)).toEqual(some(arr))
})

test("[toArray] (casts::vector) returns none if parsing fails", () => {
	// @ts-expect-error
	expect(toArray()({})).toEqual(none)
	// @ts-expect-error
	expect(toArray()(123)).toEqual(none)
	// @ts-expect-error
	expect(toArray()(false)).toEqual(none)
})
