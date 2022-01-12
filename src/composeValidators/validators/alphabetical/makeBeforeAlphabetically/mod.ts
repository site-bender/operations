import makeOperator from "../../../../makeOperator/mod.ts"
import type {
	BeforeAlphabeticallyConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import type { Operation } from "../../../../types/operations.ts"
import type { StringValue } from "../../../../types/values.ts"
import localeCompareSupportsLocales from "../../../utilities/localCompareSupportsLocales/mod.ts"
import makeError from "../../../utilities/makeError/mod.ts"

export default function makeBeforeAlphabetically(
	constraint: BeforeAlphabeticallyConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint
	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function beforeAlphabetically(validation: Validation): Validation {
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

		return order > 0 ? validation : makeError(validation, constraint)
	}
}
