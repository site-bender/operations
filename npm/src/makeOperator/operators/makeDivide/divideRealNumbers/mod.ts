import { Injector } from "../../../../types/operations.js"
import { NumberValue, RealNumberValue } from "../../../../types/values.js"
import convertToRealNumber from "../../../utilities/convertToRealNumber/mod.js"

export default function divideRealNumbers(
	dividend: Injector,
	divisor: Injector,
): RealNumberValue {
	const left = convertToRealNumber(dividend() as NumberValue | number)
	const right = convertToRealNumber(divisor() as NumberValue | number)

	return {
		datatype: "real",
		value: left.value / right.value,
	} as RealNumberValue
}
