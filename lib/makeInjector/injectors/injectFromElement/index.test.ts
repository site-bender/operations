import { test, expect } from "vitest"
import { JSDOM } from "jsdom"

import left from "@sitebender/fp/lib/either/left"
import some from "@sitebender/fp/lib/option/some"
import right from "@sitebender/fp/lib/either/right"

import injectFromElement from "."
import {
	SbInjectFromElement,
	SbInjectorType,
	SbOperationTags,
} from "../../../types"

const dom = new JSDOM(
	`<!DOCTYPE html>
<output id="fu">666</output>
<output id="man">  ha  </output>
<output id="chu">true</output>
`,
)

globalThis.document = dom.window.document

test("[injectFromElement] (injectors) returns success for number", () => {
	const operation = {
		_tag: SbOperationTags.injector,
		injectedDataType: "number",
		type: SbInjectorType.element,
		source: {
			id: "fu",
		},
	} as SbInjectFromElement<"number">

	expect(injectFromElement(operation)()()).toEqual(right(some(666)))
})

test("[injectFromElement] (injectors) returns success for string", () => {
	const operation = {
		_tag: SbOperationTags.injector,
		injectedDataType: "string",
		type: SbInjectorType.element,
		source: {
			id: "man",
		},
	} as SbInjectFromElement<"string">

	expect(injectFromElement(operation)()()).toEqual(right(some("ha")))
})

test("[injectFromElement] (injectors) returns success for boolean", () => {
	const operation = {
		_tag: SbOperationTags.injector,
		injectedDataType: "boolean",
		type: SbInjectorType.element,
		source: {
			id: "chu",
		},
	} as SbInjectFromElement<"boolean">

	expect(injectFromElement(operation)()()).toEqual(right(some(true)))
})

test("[injectFromElement] (injectors) returns error if no such element", () => {
	const operation = {
		_tag: SbOperationTags.injector,
		injectedDataType: "boolean",
		type: SbInjectorType.element,
		source: {
			id: "nobody",
		},
	} as SbInjectFromElement<"boolean">

	expect(injectFromElement(operation)()()).toEqual(
		left(["Form element at `#nobody` not found."]),
	)
})
