import makeOperator from "../../../../makeOperator/mod.js"
import type {
	AfterAlphabeticallyConstraint,
	Validation,
} from "../../../../types/constraints.js"
import { Operation } from "../../../../types/operations.js"
import type { StringValue } from "../../../../types/values.js"
import localeCompareSupportsLocales from "../../../utilities/localCompareSupportsLocales/mod.js"
import makeError from "../../../utilities/makeError/mod.js"

export default function makeAfterAlphabetically(
	constraint: AfterAlphabeticallyConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint
	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function afterAlphabetically(validation: Validation): Validation {
		const { language = "en", options } = constraint

		const injected = injector()
		const testValue = typeof injected === "string"
			? injected
			: (injected as StringValue).value

		/* istanbul ignore next */
		const order = localeCompareSupportsLocales()
			? ((testValue as string) || "").localeCompare(
				validation.value as string,
				language,
				options,
			)
			: ((testValue as string) || "").localeCompare(validation.value as string)

		return order < 0
			? validation
			: makeError(
				validation,
				constraint,
				`come after ${testValue} alphabetically`,
			)
	}
}
