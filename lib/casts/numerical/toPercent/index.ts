import type { Option } from "@sitebender/fp/lib/option"

import map from "@sitebender/fp/lib/option/map"

import toRealNumber from "../toRealNumber"

export type ToPercentF = (n: number | string | bigint) => Option<number>

const toPercent: ToPercentF = (n: number | string | bigint) => {
	const num = toRealNumber(n)

	return map<number, number>(value => value / 100)(num)
}

export default toPercent
