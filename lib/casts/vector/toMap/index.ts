import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

export type ToMapF = (
	itemSeparator?: string,
) => (
	keyValueSeparator?: string,
) => <T>(
	arg: string | Map<string, T | string>,
) => Option<Map<string, (T | string) | Array<T | string>>>

const toMap: ToMapF =
	(itemSeparator = "&") =>
	(keyValueSeparator = "=") =>
	arg => {
		if (typeof arg == "string") {
			return some(
				arg.split(itemSeparator).reduce((out, pair) => {
					const [key, value] = pair.split(keyValueSeparator)

					const val = out.has(key)
						? ([out.get(key), value].flat() as Array<string>)
						: value

					out.set(key, val)

					return out
				}, new Map<string, string | Array<string>>()),
			)
		}

		return arg instanceof Map ? some(arg) : none
	}

export default toMap
