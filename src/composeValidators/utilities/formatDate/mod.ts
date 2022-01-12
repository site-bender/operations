import type { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"
import getPlainDate from "../getPlainDate/mod.ts"

export default function formatDate(
	date: Temporal.PlainDate | Date | string,
): string {
	return getPlainDate(date).toLocaleString("en-NZ", {
		day: "numeric",
		month: "long",
		year: "numeric",
	})
}
