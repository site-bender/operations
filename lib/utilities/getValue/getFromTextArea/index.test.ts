import { expect, test } from "vitest"
import { JSDOM } from "jsdom"
import { none, some } from "../../../fp/option"

import getFromTextArea from "."

const dom = new JSDOM(
	`<!DOCTYPE html>
	<textarea name="textarea">textarea</textarea>
	<textarea name="zero">0</textarea>
	<textarea name="empty"></textarea>
`,
)

globalThis.document = dom.window.document

test("gets Some(value) from textarea and None if empty", () => {
	const textarea = document.querySelector(
		"[name=textarea]",
	) as HTMLTextAreaElement
	const zero = document.querySelector("[name=zero]") as HTMLTextAreaElement
	const empty = document.querySelector("[name=empty]") as HTMLTextAreaElement

	expect(getFromTextArea(textarea)()).toStrictEqual(some("textarea"))
	expect(getFromTextArea(zero)()).toStrictEqual(some("0"))
	expect(getFromTextArea(empty)()).toStrictEqual(none)
})
