import type { FractionValue } from "../../../types/values.ts"
import greatestCommonDenominator from "../greatestCommonDenominator/mod.ts"

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
