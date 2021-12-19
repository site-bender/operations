import { TypeOfTruncation } from '../../../../types/enums.js'
import { Injector } from '../../../../types/operations.js'
import { IntegerValue, NumberValue } from '../../../../types/values.js'
import convertToInteger from '../../../utilities/convertToInteger/mod.js'

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
