import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

export type ToTrainCase = (s: string) => Option<string>

const toTrainCase: ToTrainCase = s =>
	typeof s === "string"
		? some(
				s
					.toLocaleLowerCase()
					.trim()
					.replaceAll(/-/g, " ")
					.split(" ")
					.map(word => word.replaceAll(/\W/g, ""))
					.join("-"),
			)
		: none

export default toTrainCase
