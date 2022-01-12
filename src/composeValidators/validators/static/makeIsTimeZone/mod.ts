import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"
import type {
	TimeZoneTypeConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import getTimeZone from "../../../utilities/getTimeZone/mod.ts"
import makeError from "../../../utilities/makeError/mod.ts"

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
