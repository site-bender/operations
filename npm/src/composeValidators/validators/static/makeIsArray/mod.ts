import type {
	ArrayTypeConstraint,
	Validation,
} from "../../../../types/constraints.js"
import { Value } from "../../../../types/values.js"
import makeError from "../../../utilities/makeError/mod.js"

export default function makeIsArray(
	constraint: ArrayTypeConstraint,
): (validation: Validation) => Validation {
	const { separator = "," } = constraint

	return function isArray(validation: Validation): Validation {
		const value = typeof validation?.value === "object" &&
				"value" in (validation.value as Value)
			? (validation.value as Value).value
			: validation.value

		const testValue = typeof value === "string"
			? value.split(separator)
			: value

		return testValue && Array.isArray(testValue)
			? validation
			: makeError(validation, constraint)
	}
}
