import { Temporal } from '@js-temporal/polyfill'
import getZonedDateTime from '../../../../makeMakeInjector/utilities/getZonedDateTime/mod.js'
import type {
	Validation,
	ZonedDateTimeTypeConstraint,
} from '../../../../types/constraints.js'
import makeError from '../../../utilities/makeError/mod.js'

export default function makeIsZonedDateTime(
	constraint: ZonedDateTimeTypeConstraint,
): (validation: Validation) => Validation {
	return function isZonedDateTime(validation: Validation): Validation {
		const value = validation.value

		try {
			getZonedDateTime(value as string | Temporal.ZonedDateTime | Date)

			return validation
		} catch (e) {
			return makeError(validation, constraint, (e as Error).toString())
		}
	}
}
