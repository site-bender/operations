import pipe from './mod.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const add =
	(x: number) =>
	(y: number): number =>
		x + y
const multiply =
	(x: number) =>
	(y: number): number =>
		x * y
const subtract =
	(x: number) =>
	(y: number): number =>
		y - x
const divide =
	(x: number) =>
	(y: number): number =>
		y / x

Deno.test(
	'[pipe] accepts array of functions and returns a function that calls them sequentially',
	() => {
		assertEquals(pipe([add(5), multiply(4), subtract(10), divide(2)])(0), 5)
	},
)

Deno.test('[pipe] works as identity if no functions passed', () => {
	assertEquals(pipe()(5), 5)
})
