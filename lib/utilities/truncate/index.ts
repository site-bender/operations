import type { NumericalBase } from "../../types"

export type Truncation = Omit<NumericalBase, "operation">

export type TruncateF = (op: Truncation) => (value: number) => number

const truncate: TruncateF = trunc => value => {
	const { truncation = "round", precision = 0 } = trunc
	const multiplier = Math.pow(10, precision)
	const val = value * multiplier

	switch (truncation) {
		case "ceiling":
			return Math.ceil(val) / multiplier
		case "round":
			return Math.round(val) / multiplier
		case "floor":
			return Math.floor(val) / multiplier
		default:
			return Math.trunc(val) / multiplier
	}
}

export default truncate
