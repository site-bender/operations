import type { Option } from "@sitebender/fp/lib/option"

import map from "@sitebender/fp/lib/option/map"

import toPascalCase from "../toPascalCase"

export type ToCamelCaseF = (s: string) => Option<string>

const toCamelCase: ToCamelCaseF = s =>
	map<string, string>(([h, ...t]) =>
		h ? [h.toLocaleLowerCase(), ...t].join("") : "",
	)(toPascalCase(s))

export default toCamelCase
