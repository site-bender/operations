import type {
	ConfirmationConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import makeError from '../../../utilities/makeError/mod.ts'

export default function makeConfirmation(
	constraint: ConfirmationConstraint,
): (validation: Validation) => Validation {
	return function confirmation(validation: Validation): Validation {
		const value = validation.value

		return (typeof value === 'boolean' && value) || value
			? validation
			: makeError(validation, constraint)
	}
}
