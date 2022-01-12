import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"
import type {
	Validation,
	YearMonthConstraint,
} from "../../../../types/constraints.ts"
import getYearMonth from "../../../utilities/getYearMonth/mod.ts"
import makeError from "../../../utilities/makeError/mod.ts"

// FIXME
export default function makeIsYearMonth(
	constraint: YearMonthConstraint,
): (validation: Validation) => Validation {
	return function isYearMonth(validation: Validation): Validation {
		const value = validation.value

		try {
			getYearMonth(value as string | Temporal.PlainYearMonth | Date)

			return validation
		} catch (e) {
			return makeError(validation, constraint, (e as Error).toString())
		}
	}
}
