import { Temporal } from 'https://cdn.skypack.dev/@js-temporal/polyfill?dts'
import type {
	DateTypeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import type { Value } from '../../../../types/values.ts'
import getPlainDate from '../../../utilities/getPlainDate/mod.ts'
import makeError from '../../../utilities/makeError/mod.ts'

export default function makeIsDate(
	constraint: DateTypeConstraint,
): (validation: Validation) => Validation {
	return function isDate(validation: Validation): Validation {
		const value =
			typeof validation?.value === 'object' &&
			'value' in (validation.value as Value)
				? (validation.value as Value).value
				: validation.value

		try {
			getPlainDate(value as string | Temporal.PlainDate | Date)

			return validation
		} catch (e) {
			return makeError(validation, constraint, (e as Error).toString())
		}
	}
}
