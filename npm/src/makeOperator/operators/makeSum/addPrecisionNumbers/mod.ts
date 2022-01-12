import { TypeOfTruncation } from "../../../../types/enums.js"
import { Injector } from "../../../../types/operations.js"
import { NumberValue, PrecisionNumberValue } from "../../../../types/values.js"
import convertToPrecisionNumber from "../../../utilities/convertToPrecisionNumber/mod.js"

export default function addPrecisionNumbers(
	addends: Array<Injector>,
	decimalPlaces = 0,
	truncationType = TypeOfTruncation.ROUND,
): PrecisionNumberValue {
	return addends.reduce(
		(acc: PrecisionNumberValue, addend: Injector) => {
			const value = convertToPrecisionNumber(
				addend() as NumberValue | number,
				decimalPlaces,
				truncationType,
			) as PrecisionNumberValue

			return {
				datatype: "precision",
				decimalPlaces,
				value: acc.value + value.value,
			} as PrecisionNumberValue
		},
		{
			datatype: "precision",
			decimalPlaces,
			value: 0,
		} as PrecisionNumberValue,
	) as PrecisionNumberValue
}
