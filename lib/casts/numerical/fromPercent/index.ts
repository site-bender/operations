import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

export type FromPercentF = (pct: number | string) => Option<number>
const fromPercent: FromPercentF = pct => {
	if (typeof pct === "number") {
		return some(pct * 100)
	}

	const num = parseFloat(pct)

	return Number.isNaN(num) ? none : some(num * 100)
}

export default fromPercent
