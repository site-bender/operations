import { expect, test } from "vitest"

import castValue from "."
import isLeft from "@sitebender/fp/lib/either/isLeft"
import left from "@sitebender/fp/lib/either/left"
import right from "@sitebender/fp/lib/either/right"

test("casts the value to the actual type", () => {
	expect(castValue("boolean")("false")).toStrictEqual(right(false))
	expect(castValue("boolean")("true")).toStrictEqual(right(true))
	expect(castValue("boolean")({})).toStrictEqual(
		left(["Value is not a boolean"]),
	)

	expect(castValue("integer")(-66)).toStrictEqual(right(-66))
	expect(castValue("integer")(6.66)).toStrictEqual(right(6)) // should this fail?
	expect(castValue("integer")(Number.NaN)).toStrictEqual(
		left(["Failed to parse NaN to an integer"]),
	)

	expect(castValue("number")(-66)).toStrictEqual(right(-66))
	expect(castValue("number")("55")).toStrictEqual(right(55))
	expect(castValue("number")(Number.NaN)).toStrictEqual(
		left(["Failed to parse NaN to a number"]),
	)

	expect(castValue("string")(-66)).toStrictEqual(right("-66"))
	expect(isLeft(castValue("boolean")(0))).toBeTruthy()
})
