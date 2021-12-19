import { TypeOfTruncation } from '../../../../types/enums.js'
import { Injector } from '../../../../types/operations.js'
import { IntegerValue, NumberValue } from '../../../../types/values.js'
import convertToInteger from '../../../utilities/convertToInteger/mod.js'

export default function divideIntegers(
	dividend: Injector,
	divisor: Injector,
	truncationType = TypeOfTruncation.TRUNCATE,
): IntegerValue {
	const left = convertToInteger(
		dividend() as NumberValue | number,
		truncationType,
	)
	const right = convertToInteger(
		divisor() as NumberValue | number,
		truncationType,
	)

	return {
		datatype: 'integer',
		value: Math.round(left.value / right.value),
	} as IntegerValue
}
