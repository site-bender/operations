import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

export type ToSentenceCaseF = (s: string) => Option<string>

const toSentenceCase: ToSentenceCaseF = s =>
	typeof s === "string"
		? some(s.charAt(0).toLocaleUpperCase() + s.slice(1))
		: none

export default toSentenceCase
