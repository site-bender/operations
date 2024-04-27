import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

const isMappable = (record: unknown) =>
	typeof record === "object" &&
	(record == null ||
		record instanceof Array ||
		record instanceof Map ||
		record instanceof Set ||
		record instanceof Date)

const reducer = <T>(_: unknown, value: Iterable<T>) =>
	isMappable(value) ? [...value] : value

export type ToStringF = <T>(arg: T) => Option<string>

const toString: ToStringF = arg => {
	if (arg == null) {
		return none
	}

	return some(JSON.stringify(arg, reducer))
}

export default toString
