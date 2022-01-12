import { TypeOfTruncation } from "../../../../types/enums.js"
import { Injector } from "../../../../types/operations.js"
import { NumberValue, PrecisionNumberValue } from "../../../../types/values.js"
import convertToPrecisionNumber from "../../../utilities/convertToPrecisionNumber/mod.js"
import truncate from "../../../utilities/truncate/mod.js"

export default function dividePrecisionNumbers(
	dividend: Injector,
	divisor: Injector,
	decimalPlaces = 0,
	truncationType = TypeOfTruncation.ROUND,
): PrecisionNumberValue {
	const left = convertToPrecisionNumber(
		dividend() as NumberValue | number,
		decimalPlaces,
		truncationType,
	)
	const right = convertToPrecisionNumber(
		divisor() as NumberValue | number,
		decimalPlaces,
		truncationType,
	)

	return {
		datatype: "precision",
		decimalPlaces,
		value: truncate(left.value / right.value, truncationType, decimalPlaces),
	} as PrecisionNumberValue
}
