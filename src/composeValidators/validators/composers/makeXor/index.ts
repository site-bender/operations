import composeValidators from '../../..'
import type {
	Constraint,
	Validation,
	ValidationError,
	XorConstraint,
} from '../../../../types/constraints'
import pipe from '../../../../utilities/pipe'

const xorFormatter = new Intl.ListFormat('en', {
	style: 'long',
	type: 'unit',
})

export default function makeXor(
	constraint: XorConstraint,
): (validation: Validation) => Validation {
	const { tests } = constraint
	const validators = tests.map(
		(test: Constraint): ((validation: Validation) => Validation) =>
			composeValidators(test),
	)
	const validateXor = pipe(validators) as (validation: Validation) => Validation

	return function xor(validation: Validation): Validation {
		const validated: Validation = validateXor(validation) as Validation

		const { xors, others }: XorSplitter = (
			validated.errors || ([] as Array<ValidationError>)
		).reduce(
			(acc, error) =>
				error.error === 'XOR_ERROR'
					? { ...acc, xors: [...acc.xors, error] }
					: { ...acc, others: [...acc.others, error] },
			{ xors: [], others: [] } as XorSplitter,
		)

		return validated.errors?.length === constraint.tests.length - 1
			? validation
			: {
					...validation,
					isInvalid: true,
					errors: [
						...xors,
						{
							constraint,
							error: 'XOR_ERROR',
							errors: others,
							errorMessage: xorFormatter.format(
								others
									.map(({ errorMessage }) => errorMessage)
									.filter((value) => value) as Array<string>,
							),
						} as ValidationError,
					],
			  }
	}
}

type XorSplitter = {
	xors: Array<ValidationError>
	others: Array<ValidationError>
}
