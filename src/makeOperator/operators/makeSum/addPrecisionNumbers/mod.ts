import { TypeOfTruncation } from '../../../../types/enums.ts'
import type { Injector } from '../../../../types/operations.ts'
import type {
	NumberValue,
	PrecisionNumberValue,
} from '../../../../types/values.ts'
import convertToPrecisionNumber from '../../../utilities/convertToPrecisionNumber/mod.ts'

export default function addPrecisionNumbers(
	addends: Array<Injector>,
	decimalPlaces = 0,
	truncationType = TypeOfTruncation.ROUND,
): PrecisionNumberValue {
	return addends.reduce(
		(acc: PrecisionNumberValue, addend: Injector) => {
			const value = convertToPrecisionNumber(
				addend() as NumberValue | number,
				decimalPlaces,
				truncationType,
			) as PrecisionNumberValue

			return {
				datatype: 'precision',
				decimalPlaces,
				value: acc.value + value.value,
			} as PrecisionNumberValue
		},
		{
			datatype: 'precision',
			decimalPlaces,
			value: 0,
		} as PrecisionNumberValue,
	) as PrecisionNumberValue
}
