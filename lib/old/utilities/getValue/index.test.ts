import { expect, test } from "vitest"
import { JSDOM } from "jsdom"

import getValue from "."
import { left, right } from "@sitebender/fp/lib/either"
import { none, some } from "@sitebender/fp/lib/option"

const dom = new JSDOM(
	`<!DOCTYPE html>
	<input name="text" type="text" value="value">
	<input name="nope" type="text" value="">
	<input checked name="checkbox" type="checkbox" value="checked">
	<input name="uncheckbox" type="checkbox" value="unchecked">
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
	<textarea name="textarea">textarea</textarea>
	<textarea name="zero">0</textarea>
	<textarea name="empty"></textarea>
	<button name="button">Hi!</button>
`,
)

globalThis.document = dom.window.document

test("gets the value from form inputs", () => {
	expect(getValue({ name: "text", tagName: "INPUT" })()).toStrictEqual(
		right(some("value")),
	)
	expect(getValue({ name: "nope", tagName: "INPUT" })()).toStrictEqual(
		right(none),
	)
	expect(getValue({ name: "bob", tagName: "UNKNOWN" })()).toStrictEqual(
		left(["Form element `bob` not found."]),
	)
})

test("gets the value from checkboxes", () => {
	expect(getValue({ name: "checkbox", tagName: "INPUT" })()).toStrictEqual(
		right(some("checked")),
	)
	expect(getValue({ name: "uncheckbox", tagName: "INPUT" })()).toStrictEqual(
		right(none),
	)
})

test("gets the value from selects", () => {
	expect(getValue({ name: "unselected", tagName: "SELECT" })()).toStrictEqual(
		right(none),
	)
	expect(getValue({ name: "select", tagName: "SELECT" })()).toStrictEqual(
		right(some("2")),
	)
	expect(getValue({ name: "multiselect", tagName: "SELECT" })()).toStrictEqual(
		right(some("yellow")),
	)
})

test("gets the value from textareas", () => {
	expect(getValue({ name: "textarea", tagName: "TEXTAREA" })()).toStrictEqual(
		right(some("textarea")),
	)
	expect(getValue({ name: "zero", tagName: "TEXTAREA" })()).toStrictEqual(
		right(some("0")),
	)
	expect(getValue({ name: "empty", tagName: "TEXTAREA" })()).toStrictEqual(
		right(none),
	)
})

test("returns an error Left<Array<string>> on wrong element type", () => {
	expect(getValue({ name: "button", tagName: "BUTTON" })()).toStrictEqual(
		left(["Element `button` is not a recognized form element"]),
	)
})
