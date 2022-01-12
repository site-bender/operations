import makeOperator from "../../../../makeOperator/mod.ts"
import type {
	OverlappingSetConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import type { Operation } from "../../../../types/operations.ts"
import type { Arrays, Sets, SetValue } from "../../../../types/values.ts"
import convertToSet from "../../../utilities/convertToSet/mod.ts"
import isOverlapping from "../../../utilities/isOverlapping/mod.ts"
import makeError from "../../../utilities/makeError/mod.ts"

export default function makeOverlappingSet(
	constraint: OverlappingSetConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint

	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function overlappingSet(validation: Validation): Validation {
		const injected = injector()

		return isOverlapping(
				convertToSet(injected as string | SetValue | Sets | Arrays),
				convertToSet(validation.value as string | SetValue | Sets | Arrays),
			)
			? validation
			: makeError(validation, constraint)
	}
}
