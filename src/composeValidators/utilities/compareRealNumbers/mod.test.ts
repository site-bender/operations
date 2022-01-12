import {
	assertEquals,
	assertThrows,
} from "https://deno.land/std@0.118.0/testing/asserts.ts"
import type { RealNumberValue } from "../../../types/values.ts"
import compareRealNumbers, { REAL_NUMBER_PRECISION } from "./mod.ts"

const pOne: RealNumberValue = {
	datatype: "real",
	value: 1 + 1 / REAL_NUMBER_PRECISION,
}

const pTwo: RealNumberValue = {
	datatype: "real",
	value: 1 + 2 / REAL_NUMBER_PRECISION,
}

const bad = {
	datatype: "real",
	value: true,
}

Deno.test(
	"[compareRealNumbers] returns -1 if left is greater than right",
	() => {
		assertEquals(compareRealNumbers(pOne, pTwo), -1)
	},
)

Deno.test("[compareRealNumbers] returns 0 if left is equal to right", () => {
	assertEquals(compareRealNumbers(pOne, pOne), 0)
})

Deno.test("[compareRealNumbers] returns -1 if left is less than right", () => {
	assertEquals(compareRealNumbers(pTwo, pOne), 1)
})

Deno.test(
	`[compareRealNumbers] has a fixed precision of ${1 / REAL_NUMBER_PRECISION}`,
	() => {
		const tooSmallOne: RealNumberValue = {
			datatype: "real",
			value: 1 + 1 / REAL_NUMBER_PRECISION / 10,
		}

		const tooSmallTwo: RealNumberValue = {
			datatype: "real",
			value: 1 + 2 / REAL_NUMBER_PRECISION / 10,
		}

		assertEquals(compareRealNumbers(tooSmallTwo, tooSmallOne), 0)
	},
)

Deno.test(
	"[compareRealNumbers] throws an error if left argument is not a real number",
	() => {
		assertThrows(
			// @ts-ignore: for testing purposes
			() => compareRealNumbers(bad, pOne),
			Error,
			"true is not a real number",
		)
	},
)

Deno.test(
	"[compareRealNumbers] throws an error if right argument is not a real number",
	() => {
		assertThrows(
			// @ts-ignore: for testing purposes
			() => compareRealNumbers(pTwo, bad),
			Error,
			"true is not a real number",
		)
	},
)
