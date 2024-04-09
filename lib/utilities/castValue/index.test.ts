import { expect, test } from "vitest"
import { isLeft, right } from "../../fp/either"

import castValue from "."

test("casts the value to the actual type", () => {
	expect(castValue("boolean")(right("false"))).toStrictEqual(right(false))
	expect(castValue("boolean")(right("true"))).toStrictEqual(right(true))
	expect(castValue("integer")(right(-66))).toStrictEqual(right(-66))
	expect(castValue("integer")(right(6.66))).toStrictEqual(right(6)) // should this fail?
	expect(castValue("number")(right(-66))).toStrictEqual(right(-66))
	expect(castValue("number")(right("55"))).toStrictEqual(right(55))
	expect(castValue("string")(right(-66))).toStrictEqual(right("-66"))
	expect(isLeft(castValue("boolean")(right(0)))).toBeTruthy()
})
