import { Temporal } from '@js-temporal/polyfill'
import type {
	TimeZoneTypeConstraint,
	Validation,
} from '../../../../types/constraints.js'
import getTimeZone from '../../../utilities/getTimeZone/mod.js'
import makeError from '../../../utilities/makeError/mod.js'

// FIXME
export default function makeIsTimeZone(
	constraint: TimeZoneTypeConstraint,
): (validation: Validation) => Validation {
	return function isTimeZone(validation: Validation): Validation {
		const value = validation.value

		try {
			getTimeZone(value as Temporal.TimeZone | Date | string)

			return validation
		} catch (e) {
			return makeError(validation, constraint, (e as Error).toString())
		}
	}
}
