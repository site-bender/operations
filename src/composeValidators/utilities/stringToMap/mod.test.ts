import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import stringToMap from "./mod.ts"

Deno.test("[stringToMap] creates map from valid string", () => {
	assertEquals(
		stringToMap("red:f00,green:0f0,blue:00f"),
		new Map([
			["red", "f00"],
			["green", "0f0"],
			["blue", "00f"],
		]),
	)
})

Deno.test(
	"[stringToMap] creates map from valid string with specified separators",
	() => {
		assertEquals(
			stringToMap("red=f00&green=0f0&blue=00f", "&", "="),
			new Map([
				["red", "f00"],
				["green", "0f0"],
				["blue", "00f"],
			]),
		)
	},
)

Deno.test("[stringToMap] handles missing values", () => {
	assertEquals(
		stringToMap("red:f00,green:0f0,cyan,blue:00f"),
		new Map([
			["red", "f00"],
			["green", "0f0"],
			["cyan", undefined],
			["blue", "00f"],
		]),
	)
})

Deno.test("[stringToMap] handles duplicate keys (last wins)", () => {
	assertEquals(
		stringToMap("red:f30,green:0f0,red:f00,blue:00f"),
		new Map([
			["red", "f00"],
			["green", "0f0"],
			["blue", "00f"],
		]),
	)
})

Deno.test("[stringToMap] handles missing keys (not included)", () => {
	assertEquals(
		stringToMap("red:f00,green:0f0,:fff,blue:00f"),
		new Map([
			["red", "f00"],
			["green", "0f0"],
			["blue", "00f"],
		]),
	)
})
