import { expect, test } from "vitest"
import { isLeft, right } from "@sitebender/fp/lib/either"

import isBoolean from "."

test("casts t or true to `true` and f or false to `false`", () => {
	expect(isBoolean("t")).toStrictEqual(right(true))
	expect(isBoolean("tRuE")).toStrictEqual(right(true))
	expect(isBoolean("F")).toStrictEqual(right(false))
	expect(isBoolean("fAlsE")).toStrictEqual(right(false))
})

test("all other casts return a left(error)", () => {
	expect(isLeft(isBoolean(""))).toBeTruthy()
	expect(isLeft(isBoolean("grizmo"))).toBeTruthy()
	expect(isLeft(isBoolean("ohnoohnotruetruetrue"))).toBeTruthy()
})
