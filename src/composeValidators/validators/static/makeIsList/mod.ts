import type {
	ListTypeConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import makeError from "../../../utilities/makeError/mod.ts"

export default function makeIsList(
	constraint: ListTypeConstraint,
): (validation: Validation) => Validation {
	return function isList(validation: Validation): Validation {
		const value = validation.value

		return typeof value === "string" || Array.isArray(value)
			? validation
			: makeError(validation, constraint)
	}
}
