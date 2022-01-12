import { FractionValue } from "../../../types/values.js"
import greatestCommonDenominator from "../greatestCommonDenominator/mod.js"

export default function reduceToLowestForm(
	fraction: FractionValue,
): FractionValue {
	const commonDenominator = greatestCommonDenominator(
		fraction.value.denominator,
		fraction.value.numerator,
	)

	return {
		...fraction,
		value: {
			denominator: fraction.value.denominator / commonDenominator,
			numerator: fraction.value.numerator / commonDenominator,
		},
	}
}
