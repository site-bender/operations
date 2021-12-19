import { TypeOfTruncation } from '../../../../types/enums.ts'
import type { Injector } from '../../../../types/operations.ts'
import type { FractionValue, NumberValue } from '../../../../types/values.ts'
import convertToFraction from '../../../utilities/convertToFraction/mod.ts'
import reduceToLowestForm from '../../../utilities/reduceToLowestForm/mod.ts'

export default function multiplyFractions(
	multiplicands: Array<Injector>,
	decimalPlaces = 0,
	truncationType = TypeOfTruncation.ROUND,
): FractionValue {
	return multiplicands.reduce<FractionValue>(
		(acc: FractionValue, multiplicand: Injector) => {
			const value = convertToFraction(
				multiplicand() as NumberValue | number,
				decimalPlaces,
				truncationType,
			) as FractionValue

			return reduceToLowestForm({
				datatype: 'fraction',
				value: {
					denominator: acc.value.denominator * value.value.denominator,
					numerator: acc.value.numerator * value.value.numerator,
				},
			})
		},
		{
			datatype: 'fraction',
			value: {
				denominator: 1,
				numerator: 1,
			},
		},
	)
}
