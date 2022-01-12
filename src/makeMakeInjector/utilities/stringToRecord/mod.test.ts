import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import stringToRecord from "./mod.ts"

Deno.test("[stringToRecord] creates record from valid string", () => {
	assertEquals(stringToRecord("red:f00,green:0f0,blue:00f"), {
		red: "f00",
		green: "0f0",
		blue: "00f",
	})
})

Deno.test(
	"[stringToRecord] creates record from valid string with specified separators",
	() => {
		assertEquals(stringToRecord("red=f00&green=0f0&blue=00f", "&", "="), {
			red: "f00",
			green: "0f0",
			blue: "00f",
		})
	},
)

Deno.test("[stringToRecord] handles missing values", () => {
	assertEquals(stringToRecord("red:f00,green:0f0,cyan,blue:00f"), {
		red: "f00",
		green: "0f0",
		cyan: undefined,
		blue: "00f",
	})
})

Deno.test("[stringToRecord] handles duplicate keys (last wins)", () => {
	assertEquals(stringToRecord("red:f30,green:0f0,red:f00,blue:00f"), {
		red: "f00",
		green: "0f0",
		blue: "00f",
	})
})

Deno.test("[stringToRecord] handles missing keys (not included)", () => {
	assertEquals(stringToRecord("red:f00,green:0f0,:fff,blue:00f"), {
		red: "f00",
		green: "0f0",
		blue: "00f",
	})
})
