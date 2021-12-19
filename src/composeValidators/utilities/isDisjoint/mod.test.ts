import isDisjoint from './mod.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const s1 = new Set(['red', 'green', 'blue'])

const s2 = new Set(['cyan', 'magenta', 'yellow', 'black'])

const s3 = new Set(['cyan', 'magenta', 'yellow', 'blue'])

Deno.test(
	'[isDisjoint] returns true if both sets passed have no members in common',
	() => {
		assertEquals(isDisjoint(s1, s2), true)
	},
)

Deno.test('[isDisjoint] works regardless of argument order', () => {
	assertEquals(isDisjoint(s2, s1), true)
})

Deno.test(
	'[isDisjoint] returns false if both sets have one or more shared members',
	() => {
		assertEquals(isDisjoint(s1, s3), false)
	},
)

Deno.test('[isDisjoint] works with empty set', () => {
	assertEquals(isDisjoint(s2, new Set()), true)
})

Deno.test('[isDisjoint] works with empty set flipped', () => {
	assertEquals(isDisjoint(new Set(), s1), true)
})

Deno.test(
	'[isDisjoint] returns false if both sets have one or more shared members (flipped)',
	() => {
		assertEquals(isDisjoint(s3, s1), false)
	},
)
