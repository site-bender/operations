import type { IO } from "fp-ts/lib/IO"
import { left, right } from "../../fp/either"
import isNullish from "../isNullish"

import getFromCheckbox from "./getFromCheckbox"
import getFromInput from "./getFromInput"
import getFromSelect from "./getFromSelect"
import getFromTextArea from "./getFromTextArea"
import toLower from "../../string/toLower"

type NullableInput =
	| HTMLInputElement
	| HTMLSelectElement
	| HTMLTextAreaElement
	| null

type GetValue = (name: string) => IO<Either<Array<string>, Option<string>>>

const getValue: GetValue = name => () => {
	const element = document.querySelector(`[name=${name}]`) as NullableInput

	if (isNullish(element)) {
		return left([`Form element \`${name}\` not found.`])
	}

	const tagName = toLower(element?.tagName as string)

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
