import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"
import getZonedDateTime from "../../../../makeMakeInjector/utilities/getZonedDateTime/mod.ts"
import type {
	Validation,
	ZonedDateTimeTypeConstraint,
} from "../../../../types/constraints.ts"
import makeError from "../../../utilities/makeError/mod.ts"

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
