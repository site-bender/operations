import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"
import type {
	MonthDayConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import getMonthDay from "../../../utilities/getMonthDay/mod.ts"
import makeError from "../../../utilities/makeError/mod.ts"

// FIXME
export default function makeIsMonthDay(
	constraint: MonthDayConstraint,
): (validation: Validation) => Validation {
	return function isMonthDay(validation: Validation): Validation {
		const value = validation.value

		try {
			getMonthDay(value as string | Temporal.PlainMonthDay | Date)

			return validation
		} catch (e) {
			return makeError(validation, constraint, (e as Error).toString())
		}
	}
}
