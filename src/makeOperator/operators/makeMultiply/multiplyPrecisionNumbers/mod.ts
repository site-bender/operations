import { TypeOfTruncation } from "../../../../types/enums.ts"
import type { Injector } from "../../../../types/operations.ts"
import type {
	NumberValue,
	PrecisionNumberValue,
} from "../../../../types/values.ts"
import convertToPrecisionNumber from "../../../utilities/convertToPrecisionNumber/mod.ts"

export default function multiplyPrecisionNumbers(
	multiplicands: Array<Injector>,
	decimalPlaces = 0,
	truncationType = TypeOfTruncation.ROUND,
): PrecisionNumberValue {
	return multiplicands.reduce(
		(acc: PrecisionNumberValue, multiplicand: Injector) => {
			const value = convertToPrecisionNumber(
				multiplicand() as NumberValue | number,
				decimalPlaces,
				truncationType,
			) as PrecisionNumberValue

			return {
				datatype: "precision",
				decimalPlaces,
				value: acc.value * value.value,
			} as PrecisionNumberValue
		},
		{
			datatype: "precision",
			decimalPlaces,
			value: 1,
		} as PrecisionNumberValue,
	) as PrecisionNumberValue
}
