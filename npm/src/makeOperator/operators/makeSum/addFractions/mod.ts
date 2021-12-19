import { TypeOfTruncation } from '../../../../types/enums.js'
import { Injector } from '../../../../types/operations.js'
import { FractionValue, NumberValue } from '../../../../types/values.js'
import convertToFraction from '../../../utilities/convertToFraction/mod.js'
import reduceToLowestForm from '../../../utilities/reduceToLowestForm/mod.js'

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
				datatype: 'fraction',
				value: {
					denominator: acc.value.denominator * value.value.denominator,
					numerator:
						acc.value.numerator * value.value.denominator +
						value.value.numerator * acc.value.denominator,
				},
			})
		},
		{
			datatype: 'fraction',
			value: {
				denominator: 1,
				numerator: 0,
			},
		},
	)
}
