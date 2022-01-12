import { Injector } from "../../../../types/operations.js"
import { NumberValue, RealNumberValue } from "../../../../types/values.js"
import convertToRealNumber from "../../../utilities/convertToRealNumber/mod.js"

export default function multiplyRealNumbers(
	multiplicands: Array<Injector>,
): RealNumberValue {
	return multiplicands.reduce(
		(acc: RealNumberValue, multiplicand: Injector) => {
			const value = convertToRealNumber(
				multiplicand() as NumberValue | number,
			) as RealNumberValue

			return {
				datatype: "real",
				value: acc.value * value.value,
			} as RealNumberValue
		},
		{
			datatype: "real",
			value: 1,
		} as RealNumberValue,
	) as RealNumberValue
}
