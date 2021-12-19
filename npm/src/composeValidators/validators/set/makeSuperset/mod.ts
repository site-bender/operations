import makeOperator from '../../../../makeOperator/mod.js'
import type {
	SupersetConstraint,
	Validation,
} from '../../../../types/constraints.js'
import { Operation } from '../../../../types/operations.js'
import { Arrays, Sets, SetValue } from '../../../../types/values.js'
import convertToSet from '../../../utilities/convertToSet/mod.js'
import isSuperset from '../../../utilities/isSuperset/mod.js'
import makeError from '../../../utilities/makeError/mod.js'

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
