import makeOperator from '../../../../makeOperator'
import type {
	SupersetConstraint,
	Validation,
} from '../../../../types/constraints'
import { Operation } from '../../../../types/operations'
import { Arrays, Sets, SetValue } from '../../../../types/values'
import convertToSet from '../../../utilities/convertToSet'
import isSuperset from '../../../utilities/isSuperset'
import makeError from '../../../utilities/makeError'

export default function makeSuperset(
	constraint: SupersetConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint

	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function superset(validation: Validation): Validation {
		const injected = injector()

		return isSuperset(
			convertToSet(validation.value as string | SetValue | Sets | Arrays),
			convertToSet(injected as string | SetValue | Sets | Arrays),
		)
			? validation
			: makeError(validation, constraint)
	}
}
