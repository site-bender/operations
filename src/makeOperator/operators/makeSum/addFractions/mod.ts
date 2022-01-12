import { TypeOfTruncation } from "../../../../types/enums.ts"
import type { Injector } from "../../../../types/operations.ts"
import type { FractionValue, NumberValue } from "../../../../types/values.ts"
import convertToFraction from "../../../utilities/convertToFraction/mod.ts"
import reduceToLowestForm from "../../../utilities/reduceToLowestForm/mod.ts"

export default function addFractions(
	addends: Array<Injector>,
	decimalPlaces = 0,
	truncationType = TypeOfTruncation.ROUND,
): FractionValue {
	return addends.reduce<FractionValue>(
		(acc: FractionValue, addend: Injector) => {
			const value = convertToFraction(
				addend() as NumberValue | number,
				decimalPlaces,
				truncationType,
			) as FractionValue

			return reduceToLowestForm({
				datatype: "fraction",
				value: {
					denominator: acc.value.denominator * value.value.denominator,
					numerator: acc.value.numerator * value.value.denominator +
						value.value.numerator * acc.value.denominator,
				},
			})
		},
		{
			datatype: "fraction",
			value: {
				denominator: 1,
				numerator: 0,
			},
		},
	)
}
