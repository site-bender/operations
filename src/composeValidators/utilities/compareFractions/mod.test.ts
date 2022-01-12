import {
	assertEquals,
	assertThrows,
} from "https://deno.land/std@0.118.0/testing/asserts.ts"
import type { FractionValue } from "../../../types/values.ts"
import compareFractions from "./mod.ts"

const half: FractionValue = {
	datatype: "fraction",
	value: {
		denominator: 2,
		numerator: 1,
	},
}

const fiveQuarters: FractionValue = {
	datatype: "fraction",
	value: {
		denominator: 4,
		numerator: 5,
	},
}

Deno.test("[compareFractions] returns -1 if left is less than right", () => {
	assertEquals(compareFractions(half, fiveQuarters), -1)
})

Deno.test("[compareFractions] returns 0 if left is equal to right", () => {
	assertEquals(compareFractions(half, half), 0)
})

Deno.test("[compareFractions] returns 1 if left is greater than right", () => {
	assertEquals(compareFractions(fiveQuarters, half), 1)
})

Deno.test("[compareFractions] throws an error if numerator missing", () => {
	const bad = { datatype: "fraction", value: { denominator: 4 } }

	assertThrows(
		// @ts-ignore: for testing purposes
		() => compareFractions(half, bad),
		Error,
		`${JSON.stringify(bad.value)} is not a fraction`,
	)
})

Deno.test("[compareFractions] throws an error if denominator missing", () => {
	const bad = { datatype: "fraction", value: { numerator: 4 } }

	assertThrows(
		// @ts-ignore: for testing purposes
		() => compareFractions(bad, fiveQuarters),
		Error,
		`${JSON.stringify(bad.value)} is not a fraction`,
	)
})

Deno.test(
	"[compareFractions] throws an error if argument is not a fraction",
	() => {
		assertThrows(
			// @ts-ignore: for testing purposes
			() => compareFractions(half, {}),
			Error,
			"undefined is not a fraction",
		)
	},
)
