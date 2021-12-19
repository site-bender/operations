import compareIntegers from './mod.ts'
import type { IntegerValue } from '../../../types/values.ts'
import {
	assertEquals,
	assertThrows,
} from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const one: IntegerValue = {
	datatype: 'integer',
	value: 1,
}

const two: IntegerValue = {
	datatype: 'integer',
	value: 2,
}

const bad = {
	datatype: 'integer',
	value: false,
}

Deno.test('[compareIntegers] returns -1 if left is less than right', () => {
	assertEquals(compareIntegers(one, two), -1)
})

Deno.test('[compareIntegers] returns 0 if left is equal to right', () => {
	assertEquals(compareIntegers(one, one), 0)
})

Deno.test('[compareIntegers] returns 1 if left is greater than right', () => {
	assertEquals(compareIntegers(two, one), 1)
})

Deno.test(
	'[compareIntegers] throws an error if left argument is not an integer',
	() => {
		assertThrows(
			// @ts-ignore: for testing purposes
			() => compareIntegers(bad, one),
			Error,
			'false is not an integer',
		)
	},
)

Deno.test(
	'[compareIntegers] throws an error if right argument is not an integer',
	() => {
		assertThrows(
			// @ts-ignore: for testing purposes
			() => compareIntegers(one, bad),
			Error,
			'false is not an integer',
		)
	},
)
