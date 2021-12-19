import { TypeOfReturn } from '../../../types/enums.ts'
import type { InjectValueOperation } from '../../../types/operations.ts'
import type { Arrays, Value } from '../../../types/values.ts'
import getArray from '../getArray/mod.ts'
import getCalendar from '../getCalendar/mod.ts'
import getDuration from '../getDuration/mod.ts'
import getInstant from '../getInstant/mod.ts'
import getMap from '../getMap/mod.ts'
import getPlainDate from '../getPlainDate/mod.ts'
import getPlainDateTime from '../getPlainDateTime/mod.ts'
import getRecord from '../getRecord/mod.ts'
import getSet from '../getSet/mod.ts'
import getZonedDateTime from '../getZonedDateTime/mod.ts'
import roundToSignificantDigits from '../roundToSignificantDigits/mod.ts'

const falseValueMatcher = /^f|false|0$/i

export default function parseValue(
	value: string,
	operation: InjectValueOperation,
): Value {
	const { decimalPlaces, keyValueSeparator, returnType, separator } = operation

	switch (returnType) {
		case TypeOfReturn.INTEGER:
			return {
				datatype: 'integer',
				value: parseInt(value, 10),
			}
		case TypeOfReturn.REAL_NUMBER:
			return {
				datatype: 'real',
				value:
					typeof decimalPlaces === 'number'
						? roundToSignificantDigits(parseFloat(value), decimalPlaces)
						: parseFloat(value),
				...(typeof decimalPlaces === 'number'
					? { significantDigits: decimalPlaces }
					: {}),
			}
		case TypeOfReturn.PRECISION_NUMBER:
			return {
				datatype: 'precision',
				value:
					typeof decimalPlaces === 'number'
						? roundToSignificantDigits(parseFloat(value), decimalPlaces)
						: parseFloat(value),
				...(typeof decimalPlaces === 'number'
					? { decimalPlaces: decimalPlaces }
					: {}),
			}
		case TypeOfReturn.BOOLEAN:
			return {
				datatype: 'boolean',
				value: falseValueMatcher.test(value) ? false : Boolean(value),
			}
		case TypeOfReturn.PLAIN_DATE:
			return {
				datatype: 'plainDate',
				value: getPlainDate(value),
			}
		case TypeOfReturn.PLAIN_DATE_TIME:
			return {
				datatype: 'plainDateTime',
				value: getPlainDateTime(value),
			}
		case TypeOfReturn.ZONED_DATE_TIME:
			return {
				datatype: 'zonedDateTime',
				value: getZonedDateTime(value),
			}
		case TypeOfReturn.INSTANT:
			return {
				datatype: 'instant',
				value: getInstant(value),
			}
		case TypeOfReturn.CALENDAR:
			return {
				datatype: 'calendar',
				value: getCalendar(value),
			}
		case TypeOfReturn.DURATION:
			return {
				datatype: 'duration',
				value: getDuration(value),
			}
		case TypeOfReturn.ARRAY:
			return {
				datatype: 'array',
				value: getArray(value, separator) as Arrays,
				separator,
			}
		case TypeOfReturn.MAP:
			return {
				datatype: 'map',
				value: getMap(value, separator, keyValueSeparator),
			}
		case TypeOfReturn.RECORD:
			return {
				datatype: 'record',
				value: getRecord(value, separator, keyValueSeparator),
			}
		case TypeOfReturn.SET:
			return {
				datatype: 'set',
				value: getSet(value, separator),
			}
		default:
			return {
				datatype: 'string',
				value,
			}
	}
}
