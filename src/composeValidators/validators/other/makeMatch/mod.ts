import makeOperator from '../../../../makeOperator/mod.ts'
import type {
	MatchConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import type { Operation } from '../../../../types/operations.ts'
import makeError from '../../../utilities/makeError/mod.ts'

export default function makeMatch(
	constraint: MatchConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint

	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function match(validation: Validation): Validation {
		const injected = injector()
		const testValue =
			typeof injected === 'object' && 'value' in injected
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
