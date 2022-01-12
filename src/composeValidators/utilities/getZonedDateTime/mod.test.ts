import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"
import {
	assertEquals,
	assertThrows,
} from "https://deno.land/std@0.118.0/testing/asserts.ts"
import getZonedDateTime from "./mod.ts"

Deno.test(
	"[getZonedDateTime] returns correct Temporal ZonedDateTime for string input",
	() => {
		assertEquals(
			getZonedDateTime("2020-08-05T20:06:13+09:00[Asia/Tokyo][u-ca=japanese]"),
			Temporal.ZonedDateTime.from(
				"2020-08-05T20:06:13+09:00[Asia/Tokyo][u-ca=japanese]",
			),
		)
	},
)

Deno.test(
	"[getZonedDateTime] returns correct Temporal ZonedDateTime for Date input",
	() => {
		assertEquals(
			getZonedDateTime(new Date("2021-01-01T00:00:00Z")),
			Temporal.ZonedDateTime.from("2021-01-01T00:00:00[+00:00]"),
		)
	},
)

Deno.test(
	"[getZonedDateTime] returns correct Temporal PlainDate for Temporal PlainDate input",
	() => {
		assertEquals(
			getZonedDateTime(
				Temporal.ZonedDateTime.from("2021-01-01T00:00:00[+00:00]"),
			),
			Temporal.ZonedDateTime.from("2021-01-01T00:00:00[+00:00]"),
		)
	},
)

Deno.test("[getZonedDateTime] throws error for bad input", () => {
	assertThrows(
		() => getZonedDateTime("2021-01-011T00:00:00"),
		Error,
		"invalid ISO 8601 string: 2021-01-011",
	)
})
