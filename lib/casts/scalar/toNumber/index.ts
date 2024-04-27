import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

type ToNumberF = <T>(n: T) => Option<number>

const toNumber: ToNumberF = n => {
	const num = parseFloat(String(n))

	return Number.isNaN(num) || Array.isArray(n) ? none : some(num)
}

export default toNumber
