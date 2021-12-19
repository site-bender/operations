import makeOperator from '../../../../makeOperator/mod.js'
import type {
	MemberConstraint,
	Validation,
} from '../../../../types/constraints.js'
import { Operation } from '../../../../types/operations.js'
import { Arrays, Sets, SetValue } from '../../../../types/values.js'
import convertToSet from '../../../utilities/convertToSet/mod.js'
import makeError from '../../../utilities/makeError/mod.js'

export default function makeMember(
	constraint: MemberConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint

	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function member(validation: Validation): Validation {
		const injected = injector()
		const testValue = validation.value

		const setToTestAgainst = convertToSet(
			injected as string | SetValue | Sets | Arrays,
		)

		return (setToTestAgainst as Set<unknown>).has(testValue)
			? validation
			: makeError(validation, constraint)
	}
}
