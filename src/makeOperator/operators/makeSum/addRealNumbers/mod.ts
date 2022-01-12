import type { Injector } from "../../../../types/operations.ts"
import type { NumberValue, RealNumberValue } from "../../../../types/values.ts"
import convertToRealNumber from "../../../utilities/convertToRealNumber/mod.ts"

export default function addRealNumbers(
	addends: Array<Injector>,
): RealNumberValue {
	return addends.reduce(
		(acc: RealNumberValue, addend: Injector) => {
			const value = convertToRealNumber(
				addend() as NumberValue | number,
			) as RealNumberValue

			return {
				datatype: "real",
				value: acc.value + value.value,
			} as RealNumberValue
		},
		{
			datatype: "real",
			value: 0,
		} as RealNumberValue,
	) as RealNumberValue
}
