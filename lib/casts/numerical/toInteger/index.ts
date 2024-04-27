import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

const pattern = /^[-]?([1-9][0-9]+|[0-9])n?$/

export type ToIntegerF = (
	arg: number | string | bigint,
) => Option<number | bigint>
const toInteger: ToIntegerF = arg => {
	if (typeof arg === "bigint") {
		return some(arg)
	}

	const str = String(arg)

	if (pattern.test(str)) {
		return some(str.endsWith("n") ? BigInt(parseInt(str, 10)) : Number(str))
	}

	return none
}

export default toInteger
