import { TypeOfTruncation } from "../../../../types/enums.ts"
import type { Injector } from "../../../../types/operations.ts"
import type {
	NumberValue,
	PrecisionNumberValue,
} from "../../../../types/values.ts"
import convertToPrecisionNumber from "../../../utilities/convertToPrecisionNumber/mod.ts"
import truncate from "../../../utilities/truncate/mod.ts"

export default function subtractPrecisionNumbers(
	minuend: Injector,
	subtrahend: Injector,
	decimalPlaces = 0,
	truncationType = TypeOfTruncation.ROUND,
): PrecisionNumberValue {
	const left = convertToPrecisionNumber(
		minuend() as NumberValue | number,
		decimalPlaces,
		truncationType,
	)
	const right = convertToPrecisionNumber(
		subtrahend() as NumberValue | number,
		decimalPlaces,
		truncationType,
	)

	return {
		datatype: "precision",
		decimalPlaces,
		value: truncate(left.value - right.value, truncationType, decimalPlaces),
	} as PrecisionNumberValue
}
