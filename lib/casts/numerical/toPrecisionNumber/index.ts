import type { Option } from "@sitebender/fp/lib/option"

import map from "@sitebender/fp/lib/option/map"

import toRealNumber from "../toRealNumber"

type Precision =
	| 0
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16

export type ToPrecisionNumberF = (
	precision?: Precision,
) => (arg: number | string | bigint) => Option<number>

const toPrecisionNumber: ToPrecisionNumberF =
	(precision = 2) =>
	arg => {
		const num = toRealNumber(arg)

		return map<number, number>(
			value =>
				Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision),
		)(num)
	}

export default toPrecisionNumber
