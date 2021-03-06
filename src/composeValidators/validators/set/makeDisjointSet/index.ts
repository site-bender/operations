import makeOperator from '../../../../makeOperator'
import type {
	DisjointSetConstraint,
	Validation,
} from '../../../../types/constraints'
import { Operation } from '../../../../types/operations'
import { Arrays, Sets, SetValue } from '../../../../types/values'
import convertToSet from '../../../utilities/convertToSet'
import isDisjoint from '../../../utilities/isDisjoint'
import makeError from '../../../utilities/makeError'

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
