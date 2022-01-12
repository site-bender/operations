import { Temporal } from "@js-temporal/polyfill"
import type {
	Validation,
	YearMonthConstraint,
} from "../../../../types/constraints.js"
import getYearMonth from "../../../utilities/getYearMonth/mod.js"
import makeError from "../../../utilities/makeError/mod.js"

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
