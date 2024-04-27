import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

export type ToSnakeCase = (s: string) => Option<string>

const toSnakeCase: ToSnakeCase = s =>
	typeof s === "string"
		? some(
				s
					.toLocaleLowerCase()
					.trim()
					.replaceAll(/-/g, " ")
					.split(" ")
					.map(word => word.replaceAll(/\W/g, ""))
					.join("_"),
			)
		: none

export default toSnakeCase
