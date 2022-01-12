import type {
	TypeOfBooleanConstraint,
	Validation,
} from "../../../../types/constraints.js"
import { Value } from "../../../../types/values.js"
import makeError from "../../../utilities/makeError/mod.js"

export default function makeIsBoolean(
	constraint: TypeOfBooleanConstraint,
): (validation: Validation) => Validation {
	return function isBoolean(validation: Validation): Validation {
		const value = typeof validation?.value === "object" &&
				"value" in (validation.value as Value)
			? (validation.value as Value).value
			: validation.value

		return typeof value === "boolean"
			? validation
			: makeError(validation, constraint)
	}
}
