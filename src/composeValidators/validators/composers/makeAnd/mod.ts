import composeValidators from '../../../mod.ts'
import type {
	AndConstraint,
	Constraint,
	Validation,
	ValidationError,
} from '../../../../types/constraints.ts'
import pipe from '../../../../utilities/pipe/mod.ts'
import ListFormat from 'https://cdn.skypack.dev/@formatjs/intl-listformat?dts'

const andFormatter = new ListFormat('en', {
	style: 'long',
	type: 'conjunction',
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
				return error.error === 'AND_ERROR'
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
							error: 'AND_ERROR',
							errors: others,
							errorMessage: andFormatter.format(
								others
									.map(({ errorMessage }) => errorMessage)
									.filter(value => value) as Array<string>,
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
