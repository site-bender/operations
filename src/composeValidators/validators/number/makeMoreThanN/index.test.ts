import moreThanN from '.'
import { MoreThanNConstraint, Validation } from '../../../../types/constraints'
import { TypeOfConstraint } from '../../../../types/enums'

const constraint: MoreThanNConstraint = {
	constraintType: TypeOfConstraint.MORE_THAN_N,
	operand: 42,
}

test('[moreThanN] returns correct validation if integer more than constraint value', () => {
	const validation: Validation = {
		datatype: 'integer',
		value: 43,
	}

	expect(moreThanN(constraint)(validation)).toEqual(validation)
})

test('[moreThanN] returns error if integer less than constraint value', () => {
	const validation: Validation = {
		datatype: 'integer',
		value: 41,
	}

	expect(moreThanN(constraint)(validation)).toEqual({
		...validation,
		errors: [
			{
				constraint,
				error: TypeOfConstraint.MORE_THAN_N,
			},
		],
		isInvalid: true,
	})
})
