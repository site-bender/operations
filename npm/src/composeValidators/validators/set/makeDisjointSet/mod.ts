import makeOperator from "../../../../makeOperator/mod.js"
import type {
	DisjointSetConstraint,
	Validation,
} from "../../../../types/constraints.js"
import { Operation } from "../../../../types/operations.js"
import { Arrays, Sets, SetValue } from "../../../../types/values.js"
import convertToSet from "../../../utilities/convertToSet/mod.js"
import isDisjoint from "../../../utilities/isDisjoint/mod.js"
import makeError from "../../../utilities/makeError/mod.js"

export default function makeDisjointSet(
	constraint: DisjointSetConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint

	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function disjointSet(validation: Validation): Validation {
		const injected = injector()

		return isDisjoint(
				convertToSet(injected as string | SetValue | Sets | Arrays),
				convertToSet(validation.value as string | SetValue | Sets | Arrays),
			)
			? validation
			: makeError(validation, constraint)
	}
}
