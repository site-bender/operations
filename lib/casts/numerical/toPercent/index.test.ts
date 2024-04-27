import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toPercent from "."

test("[toPercent] (casts::numerical) converts string number to Some(number) as a percent", () => {
	expect(toPercent("123")).toEqual(some(1.23))
	expect(toPercent("123n")).toEqual(some(1.23))
	expect(toPercent(123n)).toEqual(some(1.23))
	expect(toPercent("123.456")).toEqual(some(1.23456))
	expect(toPercent(Infinity)).toEqual(some(Infinity))
})

test("[toPercent] (casts::numerical) returns none for anything else", () => {
	expect(toPercent(NaN)).toEqual(none)
	expect(toPercent("xyz")).toEqual(none)
	expect(toPercent("xxx123n")).toEqual(none)
})

test("[toPercent] (casts::numerical) returns none for too big or small BigInt", () => {
	expect(toPercent(BigInt(Number.MAX_SAFE_INTEGER + 1))).toEqual(none)
	expect(toPercent(BigInt(Number.MIN_SAFE_INTEGER - 1))).toEqual(none)
})
