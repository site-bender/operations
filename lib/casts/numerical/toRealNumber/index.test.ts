import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toRealNumber from "."

test("[toRealNumber] (casts::numerical) converts string number to Some(number)", () => {
	expect(toRealNumber("123")).toEqual(some(123))
	expect(toRealNumber("123n")).toEqual(some(123))
	expect(toRealNumber(123n)).toEqual(some(123))
	expect(toRealNumber("123.456")).toEqual(some(123.456))
	expect(toRealNumber(Infinity)).toEqual(some(Infinity))
})

test("[toRealNumber] (casts::numerical) returns none for anything else", () => {
	expect(toRealNumber(NaN)).toEqual(none)
	expect(toRealNumber("xyz")).toEqual(none)
	expect(toRealNumber("xxx123n")).toEqual(none)
})

test("[toRealNumber] (casts::numerical) returns none for too big or small BigInt", () => {
	expect(toRealNumber("9007199254740990976n")).toEqual(none)
	expect(toRealNumber("-9007199254740990976n")).toEqual(none)
	expect(toRealNumber(BigInt(Number.MAX_SAFE_INTEGER + 1))).toEqual(none)
	expect(toRealNumber(BigInt(Number.MIN_SAFE_INTEGER - 1))).toEqual(none)
})
