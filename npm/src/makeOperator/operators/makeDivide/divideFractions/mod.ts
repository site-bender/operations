import { TypeOfTruncation } from "../../../../types/enums.js"
import { Injector } from "../../../../types/operations.js"
import { FractionValue, NumberValue } from "../../../../types/values.js"
import convertToFraction from "../../../utilities/convertToFraction/mod.js"
import reduceToLowestForm from "../../../utilities/reduceToLowestForm/mod.js"

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
