import type { Injector } from "../../../../types/operations.ts"
import type { NumberValue, RealNumberValue } from "../../../../types/values.ts"
import convertToRealNumber from "../../../utilities/convertToRealNumber/mod.ts"

export default function subtractRealNumbers(
	minuend: Injector,
	subtrahend: Injector,
): RealNumberValue {
	const left = convertToRealNumber(minuend() as NumberValue | number)
	const right = convertToRealNumber(subtrahend() as NumberValue | number)

	return {
		datatype: "real",
		value: left.value - right.value,
	} as RealNumberValue
}
