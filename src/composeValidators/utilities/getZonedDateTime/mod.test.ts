import { Temporal } from 'https://cdn.skypack.dev/@js-temporal/polyfill?dts'
import getZonedDateTime from './mod.ts'
import {
	assertEquals,
	assertThrows,
} from 'https://deno.land/std@0.118.0/testing/asserts.ts'

Deno.test(
	'[getZonedDateTime] returns correct Temporal ZonedDateTime for string input',
	() => {
		assertEquals(
			getZonedDateTime('2021-01-01T00:00:00'),
			Temporal.ZonedDateTime.from('2021-01-01T00:00:00'),
		)
	},
)

Deno.test(
	'[getZonedDateTime] returns correct Temporal ZonedDateTime for Date input',
	() => {
		assertEquals(
			getZonedDateTime(new Date('2021-01-01T00:00:00')),
			Temporal.ZonedDateTime.from('2021-01-01'),
		)
	},
)

Deno.test(
	'[getZonedDateTime] returns correct Temporal PlainDate for Temporal PlainDate input',
	() => {
		assertEquals(
			getZonedDateTime(Temporal.ZonedDateTime.from('2021-01-01T00:00:00')),
			Temporal.ZonedDateTime.from('2021-01-01T00:00:00'),
		)
	},
)

Deno.test('[getZonedDateTime] throws error for bad input', () => {
	assertThrows(
		() => getZonedDateTime('2021-01-011T00:00:00'),
		Error,
		'invalid ISO 8601 string: 2021-01-011',
	)
})
