import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"
import type {
	DateTimeTypeConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import getPlainDateTime from "../../../utilities/getPlainDateTime/mod.ts"
import makeError from "../../../utilities/makeError/mod.ts"

export default function makeIsDateTime(
	constraint: DateTimeTypeConstraint,
): (validation: Validation) => Validation {
	return function isDateTime(validation: Validation): Validation {
		const value = validation.value as string | Temporal.PlainDateTime | Date

		try {
			getPlainDateTime(value)

			return validation
		} catch (e) {
			return makeError(validation, constraint, (e as Error).toString())
		}
	}
}
