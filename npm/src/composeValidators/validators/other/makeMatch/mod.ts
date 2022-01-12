import makeOperator from "../../../../makeOperator/mod.js"
import type {
	MatchConstraint,
	Validation,
} from "../../../../types/constraints.js"
import { Operation } from "../../../../types/operations.js"
import makeError from "../../../utilities/makeError/mod.js"

export default function makeMatch(
	constraint: MatchConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint

	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function match(validation: Validation): Validation {
		const injected = injector()
		const testValue = typeof injected === "object" && "value" in injected
			? injected.value
			: injected

		const matcher = (
			testValue instanceof RegExp ? injected : new RegExp(injected as string)
		) as RegExp

		const value = validation.value

		return matcher.test(value as string)
			? validation
			: makeError(validation, constraint)
	}
}
