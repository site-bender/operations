import {
	assertEquals,
	assertThrows,
} from "https://deno.land/std@0.118.0/testing/asserts.ts"
import type { PrecisionNumberValue } from "../../../types/values.ts"
import compareIntegers from "./mod.ts"

const pOne: PrecisionNumberValue = {
	datatype: "precision",
	value: 1.001,
	decimalPlaces: 3,
}

const pTwo: PrecisionNumberValue = {
	datatype: "precision",
	value: 1.002,
	decimalPlaces: 3,
}

const noPrecision = {
	datatype: "precision",
	value: 1.0005,
	decimalPlaces: undefined,
}

const badValue = {
	datatype: "precision",
	value: false,
	decimalPlaces: 2,
}

Deno.test("[compareIntegers] returns -1 if left is greater than right", () => {
	assertEquals(compareIntegers(pOne, pTwo), -1)
})

Deno.test("[compareIntegers] returns 0 if left is equal to right", () => {
	assertEquals(compareIntegers(pOne, pOne), 0)
})

Deno.test("[compareIntegers] returns -1 if left is less than right", () => {
	assertEquals(compareIntegers(pTwo, pOne), 1)
})

Deno.test(
	"[compareIntegers] throws an error if left argument is not a precision number",
	() => {
		assertThrows(
			// @ts-ignore: for testing purposes
			() => compareIntegers(badValue, pTwo),
			Error,
			"false is not a precision number",
		)
	},
)

Deno.test(
	"[compareIntegers] throws an error if right argument is not a precision number",
	() => {
		assertThrows(
			// @ts-ignore: for testing purposes
			() => compareIntegers(pOne, badValue),
			Error,
			"false is not a precision number",
		)
	},
)

Deno.test(
	"[compareIntegers] throws an error if precision not specified",
	() => {
		assertThrows(
			// @ts-ignore: for testing purposes
			() => compareIntegers(pOne, noPrecision),
			Error,
			"1.0005 is not a precision number",
		)

		assertThrows(
			// @ts-ignore: for testing purposes
			() => compareIntegers(noPrecision, pTwo),
			Error,
			"1.0005 is not a precision number",
		)
	},
)
