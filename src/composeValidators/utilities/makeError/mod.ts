import type {
	Constraint,
	Validation,
	ValidationError,
} from '../../../types/constraints.ts'

export default function makeError<V extends Validation, C extends Constraint>(
	validation: V,
	constraint: C,
	errorMessage?: string,
): V {
	const errors = validation.errors || []
	const wrappedErrors = Array.isArray(errors) ? errors : [errors]

	return {
		...validation,
		isInvalid: true,
		errors: [
			...wrappedErrors,
			{
				error: constraint.constraintType,
				constraint: constraint,
				...(errorMessage ? { errorMessage } : {}),
			},
		] as Array<ValidationError>,
	}
}
