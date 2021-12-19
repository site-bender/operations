import { TypeOfTruncation } from '../../../../types/enums.js'
import { Injector } from '../../../../types/operations.js'
import { FractionValue, NumberValue } from '../../../../types/values.js'
import convertToFraction from '../../../utilities/convertToFraction/mod.js'
import reduceToLowestForm from '../../../utilities/reduceToLowestForm/mod.js'

export default function subtractFractions(
	minuend: Injector,
	subtrahend: Injector,
	decimalPlaces = 0,
	truncationType = TypeOfTruncation.ROUND,
): FractionValue {
	const left = convertToFraction(
		minuend() as NumberValue | number,
		decimalPlaces,
		truncationType,
	)
	const right = convertToFraction(
		subtrahend() as NumberValue | number,
		decimalPlaces,
		truncationType,
	)

	return reduceToLowestForm({
		datatype: 'fraction',
		value: {
			denominator:
				(left as FractionValue).value.denominator *
				(right as FractionValue).value.denominator,
			numerator:
				(left as FractionValue).value.numerator *
					(right as FractionValue).value.denominator -
				(right as FractionValue).value.numerator *
					(left as FractionValue).value.denominator,
		},
	})
}
