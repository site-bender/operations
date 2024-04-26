import getFromCheckbox from "./getFromCheckbox"
import getFromInput from "./getFromInput"
import getFromSelect from "./getFromSelect"
import getFromTextArea from "./getFromTextArea"
import toLower from "@sitebender/fp/lib/string/toLower"
import { Lazy } from "@sitebender/fp/lib/lazy"
import { left, right } from "@sitebender/fp/lib/either"
import { isNullish } from "@sitebender/fp/lib/predicates"
import { OperationResult } from "../../operations/operationResult/types"

export type NullableInput =
	| HTMLInputElement
	| HTMLSelectElement
	| HTMLTextAreaElement
	| null

export type GetValue = (name: string) => Lazy<OperationResult<string>>

const getValue: GetValue = name => () => {
	const element: NullableInput = document.querySelector(`[name=${name}]`)

	if (isNullish(element)) {
		return left([`Form element \`${name}\` not found.`])
	}

	const tagName = toLower(element.tagName)

	switch (tagName) {
		case "input":
			return element?.type === "checkbox"
				? right(getFromCheckbox(element as HTMLInputElement)())
				: right(getFromInput(element as HTMLInputElement)())
		case "select":
			return right(getFromSelect(element as HTMLSelectElement)())
		case "textarea":
			return right(getFromTextArea(element as HTMLTextAreaElement)())
		default:
			return left([`Element \`${name}\` is not a recognized form element`])
	}
}

export default getValue
