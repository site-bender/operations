import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"
import {
	assertEquals,
	assertThrows,
} from "https://deno.land/std@0.118.0/testing/asserts.ts"
import getPlainDate from "./mod.ts"

Deno.test(
	"[getPlainDate] returns correct Temporal PlainDate for string input",
	() => {
		assertEquals(
			getPlainDate("2021-01-01"),
			Temporal.PlainDate.from("2021-01-01"),
		)
	},
)

Deno.test(
	"[getPlainDate] returns correct Temporal PlainDate for Date input",
	() => {
		assertEquals(
			getPlainDate(new Date("2021-01-01")),
			Temporal.PlainDate.from("2021-01-01"),
		)
	},
)

Deno.test(
	"[getPlainDate] returns correct Temporal PlainDate for Temporal PlainDate input",
	() => {
		assertEquals(
			getPlainDate(Temporal.PlainDate.from("2021-01-01")),
			Temporal.PlainDate.from("2021-01-01"),
		)
	},
)

Deno.test("[getPlainDate] throws error for bad input", () => {
	assertThrows(
		() => getPlainDate("2021-01-011"),
		Error,
		"invalid ISO 8601 string: 2021-01-011",
	)
})
