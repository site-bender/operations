import identity from './mod.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

Deno.test('[identity] returns what it is passed', () => {
	assertEquals(identity(1), 1)
	assertEquals(identity(-1), -1)
	assertEquals(identity(true), true)
	assertEquals(identity(false), false)
	assertEquals(identity([]), [])
	assertEquals(identity({}), {})
})
