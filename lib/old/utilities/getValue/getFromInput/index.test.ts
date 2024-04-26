import { expect, test } from "vitest"
import { JSDOM } from "jsdom"
import { none, some } from "@sitebender/fp/lib/option"

import getFromInput from "."

const dom = new JSDOM(
	`<!DOCTYPE html>
	<input name="text" type="text" value="text">
	<input name="number" type="text" value="number">
	<input name="tel" type="text" value="tel">
	<input name="empty" type="text">
`,
)

globalThis.document = dom.window.document

test("gets Some(value) from checkbox if checked or None if unchecked", () => {
	const text = document.querySelector("[name=text]") as HTMLInputElement
	const number = document.querySelector("[name=number]") as HTMLInputElement
	const tel = document.querySelector("[name=tel]") as HTMLInputElement
	const empty = document.querySelector("[name=empty]") as HTMLInputElement

	expect(getFromInput(text)()).toStrictEqual(some("text"))
	expect(getFromInput(number)()).toStrictEqual(some("number"))
	expect(getFromInput(tel)()).toStrictEqual(some("tel"))
	expect(getFromInput(empty)()).toStrictEqual(none)
})
