import { TypeOfTruncation } from '../../../../types/enums.ts'
import type { Injector } from '../../../../types/operations.ts'
import type { IntegerValue, NumberValue } from '../../../../types/values.ts'
import convertToInteger from '../../../utilities/convertToInteger/mod.ts'

export default function multiplyIntegers(
	multiplicands: Array<Injector>,
	truncationType = TypeOfTruncation.TRUNCATE,
): IntegerValue {
	return multiplicands.reduce(
		(acc: IntegerValue, multiplicand: Injector) => {
			const value = convertToInteger(
				multiplicand() as NumberValue | number,
				truncationType,
			) as IntegerValue

			return {
				datatype: 'integer',
				value: acc.value * value.value,
			} as IntegerValue
		},
		{
			datatype: 'integer',
			value: 1,
		} as IntegerValue,
	) as IntegerValue
}
