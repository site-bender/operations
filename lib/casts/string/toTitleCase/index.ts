import type { Option } from "@sitebender/fp/lib/option"

import getOrElse from "@sitebender/fp/lib/option/getOrElse"
import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

import { DO_NOT_CAPITALIZE } from "../constants"

import toSentenceCase from "../toSentenceCase"

export type ToTitleCase = (s: string) => Option<string>

// TODO: This needs more test cases (especially for 'em)
const toTitleCase: ToTitleCase = s => {
	if (typeof s !== "string") {
		return none
	}

	const words = s.toLocaleLowerCase().replaceAll("-", "- ").split(" ")

	return some(
		words
			.map((word, index) => {
				if (index === 0 || index === words.length - 1) {
					return getOrElse<string>(() => "")(toSentenceCase(word))
				}

				return DO_NOT_CAPITALIZE.includes(word.replaceAll(/\W/g, ""))
					? word
					: getOrElse<string>(() => "")(toSentenceCase(word))
			})
			.join(" ")
			.replaceAll("- ", "-"),
	)
}

export default toTitleCase
