import getFromCheckbox from "./getFromCheckbox"
import getFromInput from "./getFromInput"
import getFromSelect from "./getFromSelect"
import getFromTextArea from "./getFromTextArea"
import { left, right } from "@sitebender/fp/lib/either"
import { isNullish } from "@sitebender/fp/lib/predicates"
import { SbFormInjectorData } from "../../../types"
import getFromInnerHtml from "./getFromInnerHtml"
import getSelector from "./getSelector"
import { Lazy } from "@sitebender/fp/lib/lazy"
import type { OperationResult } from "../../../operations/operationResult/types"

export type NullableInput =
	| HTMLInputElement
	| HTMLSelectElement
	| HTMLTextAreaElement
	| HTMLElement
	| null

export type GetValue = (
	source: SbFormInjectorData,
) => Lazy<OperationResult<string>>

const getValue: GetValue = source => () => {
	const selector = getSelector(source)
	const element: NullableInput = document.querySelector(selector)

	if (isNullish(element)) {
		return left([`Form element at \`${selector}\` not found.`])
	}

	switch (element.tagName) {
		case "INPUT":
			return (element as HTMLInputElement)?.type === "checkbox"
				? right(getFromCheckbox(element as HTMLInputElement)())
				: right(getFromInput(element as HTMLInputElement)())
		case "SELECT":
			return right(getFromSelect(element as HTMLSelectElement)())
		case "TEXTAREA":
			return right(getFromTextArea(element as HTMLTextAreaElement)())
		default:
			return right(getFromInnerHtml(element as HTMLElement)())
		// return left([
		// 	`Element \`${source.name}\` is not a recognized form element`,
		// ])
	}
}

export default getValue
