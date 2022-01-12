import type {
	AndConstraint,
	Constraint,
	Validation,
	ValidationError,
} from "../../../../types/constraints.js"
import pipe from "../../../../utilities/pipe/mod.js"
import composeValidators from "../../../mod.js"

const andFormatter = new Intl.ListFormat("en", {
	style: "long",
	type: "conjunction",
})

export default function makeAnd(
	constraint: AndConstraint,
): (validation: Validation) => Validation {
	const { tests } = constraint
	const validators = tests.map((test: Constraint) => composeValidators(test))
	const validateAnd = pipe(validators)

	return function and(validation: Validation): Validation {
		const validated: Validation = validateAnd(validation)

		const { ands, others }: AndSplitter = (
			validated.errors || ([] as Array<ValidationError>)
		).reduce(
			(acc, error) => {
				return error.error === "AND_ERROR"
					? { ...acc, ands: [...acc.ands, error] }
					: { ...acc, others: [...acc.others, error] }
			},
			{ ands: [], others: [] } as AndSplitter,
		)
		const output = validated.isInvalid
			? {
				isInvalid: true,
				errors: [
					...ands,
					{
						constraint,
						error: "AND_ERROR",
						errors: others,
						errorMessage: andFormatter.format(
							others
								.map(({ errorMessage }) => errorMessage)
								.filter((value) => value) as Array<string>,
						),
					} as ValidationError,
				],
			}
			: { isInvalid: validated.isInvalid, errors: validated.errors }

		return {
			...validation,
			...output,
		}
	}
}

type AndSplitter = {
	ands: Array<ValidationError>
	others: Array<ValidationError>
}
