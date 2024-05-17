import { expect, test } from "vitest"

import castValue from "."
import { isLeft, right } from "@sitebender/fp/lib/either"

test("casts the value to the actual type", () => {
	expect(castValue("boolean")("false")).toStrictEqual(right(false))
	expect(castValue("boolean")("true")).toStrictEqual(right(true))
	expect(castValue("integer")(-66)).toStrictEqual(right(-66))
	expect(castValue("integer")(6.66)).toStrictEqual(right(6)) // should this fail?
	expect(castValue("number")(-66)).toStrictEqual(right(-66))
	expect(castValue("number")("55")).toStrictEqual(right(55))
	expect(castValue("string")(-66)).toStrictEqual(right("-66"))
	expect(isLeft(castValue("boolean")(0))).toBeTruthy()
})
