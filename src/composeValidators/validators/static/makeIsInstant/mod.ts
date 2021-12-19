import { Temporal } from 'https://cdn.skypack.dev/@js-temporal/polyfill?dts'
import type {
	InstantTypeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import getInstant from '../../../utilities/getInstant/mod.ts'
import makeError from '../../../utilities/makeError/mod.ts'

// FIXME
export default function makeIsInstant(
	constraint: InstantTypeConstraint,
): (validation: Validation) => Validation {
	return function isInstant(validation: Validation): Validation {
		const value = validation.value

		try {
			getInstant(value as Temporal.Instant | Date | string)

			return validation
		} catch (e) {
			return makeError(validation, constraint, (e as Error).toString())
		}
	}
}
