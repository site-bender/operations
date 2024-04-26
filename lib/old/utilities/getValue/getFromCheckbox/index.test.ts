import { expect, test } from "vitest"
import { JSDOM } from "jsdom"
import { none, some } from "@sitebender/fp/lib/option"

import getFromCheckbox from "."

const dom = new JSDOM(
	`<!DOCTYPE html>
	<input checked name="checkbox" type="checkbox" value="checked">
	<input name="uncheckbox" type="checkbox" value="unchecked">
`,
)

globalThis.document = dom.window.document

test("gets Some(value) from checkbox if checked or None if unchecked", () => {
	const checkbox = document.querySelector("[name=checkbox]") as HTMLInputElement
	const uncheckbox = document.querySelector(
		"[name=uncheckbox]",
	) as HTMLInputElement

	expect(getFromCheckbox(checkbox)()).toStrictEqual(some("checked"))
	expect(getFromCheckbox(uncheckbox)()).toStrictEqual(none)
})
