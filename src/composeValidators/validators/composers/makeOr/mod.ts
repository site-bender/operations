import type {
	Constraint,
	OrConstraint,
	Validation,
	ValidationError,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import pipe from "../../../../utilities/pipe/mod.ts"
import composeValidators from "../../../mod.ts"

const orFormatter = new Intl.ListFormat("en", {
	style: "long",
	type: "disjunction",
})

export default function makeOr(
	constraint: OrConstraint,
): (validation: Validation) => Validation {
	const { tests }: { tests: Array<Constraint> } = constraint
	const validators = tests.map((test: Constraint) => composeValidators(test))
	const validateOr = pipe(validators)

	return function or(validation: Validation): Validation {
		const validated: Validation = validateOr(validation) as Validation

		const { ors, others }: OrSplitter = (
			validated.errors || ([] as Array<ValidationError>)
		).reduce(
			(acc, error) =>
				error.error === TypeOfConstraint.OR
					? { ...acc, ors: [...acc.ors, error] }
					: { ...acc, others: [...acc.others, error] },
			{ ors: [], others: [] } as OrSplitter,
		)

		const output = validated.isInvalid
			? {
				isInvalid: true,
				errors: [
					...ors,
					{
						constraint,
						error: TypeOfConstraint.OR,
						errors: others,
						errorMessage: orFormatter.format(
							others
								.map(({ errorMessage }) => errorMessage)
								.filter((value) => value) as Array<string>,
						),
					} as ValidationError,
				],
			}
			: { isInvalid: validated.isInvalid, errors: validated.errors }

		return ((validated.errors || []) as Array<ValidationError>).length <
				constraint.tests.length
			? validation
			: {
				...validation,
				...output,
			}
	}
}

type OrSplitter = {
	ors: Array<ValidationError>
	others: Array<ValidationError>
}
