import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

export type ToPascalCase = (s: string) => Option<string>

const toPascalCase: ToPascalCase = s =>
	typeof s === "string"
		? some(
				s
					.replace(/\W+/g, " ")
					.trim()
					.toLocaleLowerCase()
					.split(" ")
					.map(([h, ...t]) => (h ? [h.toLocaleUpperCase(), ...t].join("") : ""))
					.join(""),
			)
		: none

export default toPascalCase
