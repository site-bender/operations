import makeOperator from '../../../../makeOperator'
import type {
	OverlappingSetConstraint,
	Validation,
} from '../../../../types/constraints'
import { Operation } from '../../../../types/operations'
import { Arrays, Sets, SetValue } from '../../../../types/values'
import convertToSet from '../../../utilities/convertToSet'
import isOverlapping from '../../../utilities/isOverlapping'
import makeError from '../../../utilities/makeError'

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
