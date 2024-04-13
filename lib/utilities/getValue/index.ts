import getFromCheckbox from "./getFromCheckbox"
import getFromInput from "./getFromInput"
import getFromSelect from "./getFromSelect"
import getFromTextArea from "./getFromTextArea"
import toLower from "../../string/toLower"
import { Lazy } from "@sitebender/fp/lib/lazy"
import { Either, left, right } from "@sitebender/fp/lib/either"
import { Option } from "@sitebender/fp/lib/option"
import { isNullish } from "@sitebender/fp/lib/predicates"

type NullableInput =
	| HTMLInputElement
	| HTMLSelectElement
	| HTMLTextAreaElement
	| null

type GetValue = (name: string) => Lazy<Either<Array<string>, Option<string>>>

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
