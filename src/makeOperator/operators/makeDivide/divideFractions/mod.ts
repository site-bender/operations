import { TypeOfTruncation } from "../../../../types/enums.ts"
import type { Injector } from "../../../../types/operations.ts"
import type { FractionValue, NumberValue } from "../../../../types/values.ts"
import convertToFraction from "../../../utilities/convertToFraction/mod.ts"
import reduceToLowestForm from "../../../utilities/reduceToLowestForm/mod.ts"

export default function divideFractions(
	dividend: Injector,
	divisor: Injector,
	decimalPlaces = 0,
	truncationType = TypeOfTruncation.ROUND,
): FractionValue {
	const left = convertToFraction(
		dividend() as NumberValue | number,
		decimalPlaces,
		truncationType,
	)
	const right = convertToFraction(
		divisor() as NumberValue | number,
		decimalPlaces,
		truncationType,
	)

	return reduceToLowestForm({
		datatype: "fraction",
		value: {
			denominator: left.value.denominator * right.value.numerator,
			numerator: left.value.numerator * right.value.denominator,
		},
	})
}
