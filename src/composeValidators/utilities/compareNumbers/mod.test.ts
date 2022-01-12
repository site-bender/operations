import {
	assertEquals,
	assertThrows,
} from "https://deno.land/std@0.118.0/testing/asserts.ts"
import compareIntegers from "./mod.ts"

Deno.test("[compareIntegers] returns -1 if left is greater than right", () => {
	assertEquals(compareIntegers(1, 2), -1)
})

Deno.test("[compareIntegers] returns 0 if left is equal to right", () => {
	assertEquals(compareIntegers(2, 2), 0)
})

Deno.test("[compareIntegers] returns -1 if left is less than right", () => {
	assertEquals(compareIntegers(2, 1), 1)
})

Deno.test(
	"[compareIntegers] throws an error if left argument is not an integer",
	() => {
		assertThrows(
			// @ts-ignore: for testing purposes
			() => compareIntegers(true, 1),
			Error,
			"true is not an integer",
		)
	},
)

Deno.test(
	"[compareIntegers] throws an error if right argument is not an integer",
	() => {
		assertThrows(
			// @ts-ignore: for testing purposes
			() => compareIntegers(1, false),
			Error,
			"false is not an integer",
		)
	},
)
