import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

export type ToLowerCaseF = (s: string) => Option<string>

const toLowerCase: ToLowerCaseF = s =>
	typeof s === "string" ? some(s.toLocaleLowerCase()) : none

export default toLowerCase
