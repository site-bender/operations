import makeOperator from '../../../../makeOperator'
import type {
	MemberConstraint,
	Validation,
} from '../../../../types/constraints'
import { Operation } from '../../../../types/operations'
import { Arrays, Sets, SetValue } from '../../../../types/values'
import convertToSet from '../../../utilities/convertToSet'
import makeError from '../../../utilities/makeError'

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
