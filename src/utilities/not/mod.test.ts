import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import not from "./mod.ts"

Deno.test("[not] converts falsy to true", () => {
	assertEquals(not(0), true)
	assertEquals(not(""), true)
	assertEquals(not(undefined), true)
	assertEquals(not(null), true)
	assertEquals(not(false), true)
})

Deno.test("[not] converts truthy to false", () => {
	assertEquals(not(1), false)
	assertEquals(not("yes"), false)
	assertEquals(not([]), false)
	assertEquals(not({}), false)
	assertEquals(not(true), false)
})
