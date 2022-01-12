import type {
	StringTypeConstraint,
	Validation,
} from "../../../../types/constraints.js"
import makeError from "../../../utilities/makeError/mod.js"

export default function makeIsString(
	constraint: StringTypeConstraint,
): (validation: Validation) => Validation {
	return function isString(validation: Validation): Validation {
		const value = validation.value

		return typeof value === "string"
			? validation
			: makeError(validation, constraint)
	}
}
