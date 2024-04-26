import { expect, test } from "vitest"
import { JSDOM } from "jsdom"
import { none, some } from "@sitebender/fp/lib/option"

import getFromSelect from "."

const dom = new JSDOM(
	`<!DOCTYPE html>
	<select name="unselected">
		<option></option>
		<option>height</option>
		<option>width</option>
		<option>depth</option>
	</select>
	<select name="select">
		<option>1</option>
		<option selected>2</option>
		<option>3</option>
	</select>
	<select name="multiselect" multiple="multiple">
		<option>cyan</option>
		<option>magenta</option>
		<option selected>yellow</option>
		<option selected>black</option>
	</select>
`,
)

globalThis.document = dom.window.document

test("gets Some(value) from checkbox if checked or None if unchecked", () => {
	const unselected = document.querySelector(
		"[name=unselected]",
	) as HTMLSelectElement
	const select = document.querySelector("[name=select]") as HTMLSelectElement
	const multiselect = document.querySelector(
		"[name=multiselect]",
	) as HTMLSelectElement

	expect(getFromSelect(unselected)()).toStrictEqual(none)
	expect(getFromSelect(select)()).toStrictEqual(some("2"))
	expect(getFromSelect(multiselect)()).toStrictEqual(some("yellow"))
})
