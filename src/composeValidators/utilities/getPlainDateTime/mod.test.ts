import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"
import {
	assertEquals,
	assertThrows,
} from "https://deno.land/std@0.118.0/testing/asserts.ts"
import getPlainDateTime from "./mod.ts"

Deno.test(
	"[getPlainDateTime] returns correct Temporal PlainDateTime for string input",
	() => {
		assertEquals(
			getPlainDateTime("2021-01-01T00:00:00"),
			Temporal.PlainDateTime.from("2021-01-01T00:00:00"),
		)
	},
)

Deno.test(
	"[getPlainDateTime] returns correct Temporal PlainDateTime for Date input",
	() => {
		assertEquals(
			getPlainDateTime(new Date("2021-01-01T00:00:00")),
			Temporal.PlainDateTime.from("2021-01-01"),
		)
	},
)

Deno.test(
	"[getPlainDateTime] returns correct Temporal PlainDate for Temporal PlainDate input",
	() => {
		assertEquals(
			getPlainDateTime(Temporal.PlainDateTime.from("2021-01-01T00:00:00")),
			Temporal.PlainDateTime.from("2021-01-01T00:00:00"),
		)
	},
)

Deno.test("[getPlainDateTime] throws error for bad input", () => {
	assertThrows(
		() => getPlainDateTime("2021-01-011T00:00:00"),
		Error,
		"invalid ISO 8601 string: 2021-01-011",
	)
})
