import type {
	Constraint,
	Validation,
	ValidationError,
	ValidationErrorType,
} from "../../../types/constraints.js"

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
				error: constraint.constraintType as ValidationErrorType,
				constraint: constraint as C,
				...(errorMessage ? { errorMessage } : {}),
			},
		] as Array<ValidationError>,
	}
}
