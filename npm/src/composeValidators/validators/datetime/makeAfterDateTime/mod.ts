import { Temporal } from "@js-temporal/polyfill"
import makeOperator from "../../../../makeOperator/mod.js"
import type {
	AfterDateTimeConstraint,
	Validation,
} from "../../../../types/constraints.js"
import { Operation } from "../../../../types/operations.js"
import getPlainDateTime from "../../../utilities/getPlainDateTime/mod.js"
import makeError from "../../../utilities/makeError/mod.js"

export default function makeAfterDateTime(
	constraint: AfterDateTimeConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint
	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function afterDateTime(validation: Validation): Validation {
		const injected = injector()
		const testValue = typeof injected === "object" && "value" in injected
			? injected.value
			: injected

		try {
			const testDateTime = getPlainDateTime(
				testValue as string | Temporal.PlainDateTime | Date,
			)
			const dateToTest = getPlainDateTime(
				validation.value as string | Temporal.PlainDateTime | Date,
			)

			return Temporal.PlainDateTime.compare(dateToTest, testDateTime) > 0
				? validation
				: makeError(validation, constraint)
		} catch (e) {
			return makeError(validation, constraint, e.toString())
		}
	}
}
