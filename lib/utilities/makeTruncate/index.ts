import { OperationBase } from "../../_old/types"

type Truncation = Omit<OperationBase, "operator">

export default function makeTruncate(
	{ truncation = "round", precision = 0 } = {} as Truncation,
): (n: number) => number {
	const multiplier = Math.pow(10, precision)
	function truncate(value: number): number {
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

	return truncate
}
