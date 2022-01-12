import makeOperator from "../../../../makeOperator/mod.ts"
import type {
	ExactlyNCharactersConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import type { Operation } from "../../../../types/operations.ts"
import type { IntegerValue } from "../../../../types/values.ts"
import makeError from "../../../utilities/makeError/mod.ts"

export default function makeExactlyNCharacters(
	constraint: ExactlyNCharactersConstraint,
): (validation: Validation) => Validation {
	const { match, operand } = constraint
	const matcher = typeof match === "string" ? new RegExp(match) : match
	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function exactlyNCharacters(validation: Validation): Validation {
		const injected = injector() as IntegerValue | number
		const testValue: number =
			typeof injected === "object" && "value" in injected
				? injected.value
				: injected

		const value: string | Array<string> = (matcher
			? (validation.value as string).match(matcher)
			: (validation.value as string)) || ""

		return value.length === Math.trunc(testValue)
			? validation
			: makeError(validation, constraint)
	}
}
