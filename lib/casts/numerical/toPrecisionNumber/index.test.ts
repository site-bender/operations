import { expect, test } from "vitest"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import toPrecisionNumber from "."

test("[toPrecisionNumber] (casts::numerical) converts string number to Some(number) with passed precision", () => {
	expect(toPrecisionNumber()("123")).toEqual(some(123))
	expect(toPrecisionNumber()("123n")).toEqual(some(123))
	expect(toPrecisionNumber()(123n)).toEqual(some(123))
	expect(toPrecisionNumber()("123.456")).toEqual(some(123.46))
	expect(toPrecisionNumber()(Infinity)).toEqual(some(Infinity))
})

test("[toPrecisionNumber] (casts::numerical) returns none for anything else", () => {
	expect(toPrecisionNumber()(NaN)).toEqual(none)
	expect(toPrecisionNumber()("xyz")).toEqual(none)
	expect(toPrecisionNumber()("xxx123n")).toEqual(none)
})

test("[toPrecisionNumber] (casts::numerical) returns none for too big or small BigInt", () => {
	expect(toPrecisionNumber()("9007199254740990976n")).toEqual(none)
	expect(toPrecisionNumber()("-9007199254740990976n")).toEqual(none)
	expect(toPrecisionNumber()(BigInt(Number.MAX_SAFE_INTEGER + 1))).toEqual(none)
	expect(toPrecisionNumber()(BigInt(Number.MIN_SAFE_INTEGER - 1))).toEqual(none)
})
