import { Injector } from "../../../../types/operations.js"
import { NumberValue, RealNumberValue } from "../../../../types/values.js"
import convertToRealNumber from "../../../utilities/convertToRealNumber/mod.js"

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
