import { test, expect } from "vitest"
import makeInjectedNumberFromForm from "../../../types/injected/makeInjectedFromForm/makeInjectedNumberFromForm"
import { JSDOM } from "jsdom"
import injectFromFormInput from "."
import left from "@sitebender/fp/lib/either/left"
import some from "@sitebender/fp/lib/option/some"
import right from "@sitebender/fp/lib/either/right"

const dom = new JSDOM(
	`<!DOCTYPE html>
	<input name="foo" type="text" value="12">
`,
)

globalThis.document = dom.window.document

test("[injectFromFormInput] (injectors) returns success", () => {
	const operation = makeInjectedNumberFromForm("foo")
	expect(injectFromFormInput(operation)()()).toEqual(right(some(12)))
})

test("[injectFromFormInput] (injectors) returns success", () => {
	const operation = { ...makeInjectedNumberFromForm("foo"), eager: true }
	expect(injectFromFormInput(operation)()()).toEqual(right(some(12)))
})

test("[injectFromFormInput] (injectors) returns a failure for a non-existant key", () => {
	const operation = makeInjectedNumberFromForm("bar")
	expect(injectFromFormInput(operation)()()).toEqual(
		left(["Form element `bar` not found."]),
	)
})
