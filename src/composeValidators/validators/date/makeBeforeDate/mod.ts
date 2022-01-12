import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"
import makeOperator from "../../../../makeOperator/mod.ts"
import type {
	BeforeDateConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import type { Operation } from "../../../../types/operations.ts"
import getPlainDate from "../../../utilities/getPlainDate/mod.ts"
import makeError from "../../../utilities/makeError/mod.ts"

export default function makeBeforeDate(
	constraint: BeforeDateConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint
	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function beforeDate(validation: Validation): Validation {
		const injected = injector()
		const testValue = typeof injected === "object" && "value" in injected
			? injected.value
			: injected

		try {
			const testDate = getPlainDate(
				testValue as string | Date | Temporal.PlainDate,
			)
			const dateToTest = getPlainDate(
				validation.value as string | Temporal.PlainDate | Date,
			)

			return Temporal.PlainDate.compare(dateToTest, testDate) < 0
				? validation
				: makeError(validation, constraint)
		} catch (e) {
			return makeError(validation, constraint, e.toString())
		}
	}
}
