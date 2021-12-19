import makeOperator from '../../../../makeOperator/mod.ts'
import type {
	MemberConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import type { Operation } from '../../../../types/operations.ts'
import type { Arrays, Sets, SetValue } from '../../../../types/values.ts'
import convertToSet from '../../../utilities/convertToSet/mod.ts'
import makeError from '../../../utilities/makeError/mod.ts'

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
