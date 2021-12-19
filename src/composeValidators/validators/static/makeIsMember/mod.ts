import type {
	MemberTypeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import makeError from '../../../utilities/makeError/mod.ts'

export default function makeIsMember(
	constraint: MemberTypeConstraint,
): (validation: Validation) => Validation {
	return function isMember(validation: Validation): Validation {
		const value = validation.value

		return typeof value !== 'undefined'
			? validation
			: makeError(validation, constraint)
	}
}
