import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

const pattern = /^[-]?(([1-9][0-9]+|[0-9])n)|(([1-9][0-9]+|[0-9])(\.[0-9]+)?)$/

export type ToRealNumberF = (arg: number | string | bigint) => Option<number>

const toRealNumber: ToRealNumberF = arg => {
	if (typeof arg === "number") {
		return Number.isNaN(arg) ? none : some(arg)
	}

	if (typeof arg === "bigint") {
		return arg <= Number.MAX_SAFE_INTEGER && arg >= Number.MIN_SAFE_INTEGER
			? some(Number(arg))
			: none
	}

	const str = String(arg)

	if (pattern.test(str)) {
		if (typeof arg === "string" && arg.endsWith("n")) {
			const num = BigInt(arg.replace(/n$/, ""))

			return num <= Number.MAX_SAFE_INTEGER && num >= Number.MIN_SAFE_INTEGER
				? some(Number(num))
				: none
		}

		return some(Number(str))
	}

	return none
}

export default toRealNumber
