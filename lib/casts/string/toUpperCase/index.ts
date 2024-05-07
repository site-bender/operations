import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

export type ToUpperCaseF = (s: string) => Option<string>

const toUpperCase: ToUpperCaseF = s =>
	typeof s === "string" ? some(s.toLocaleUpperCase()) : none

export default toUpperCase
