import lessThanN from './mod.js'
import {
	LessThanNConstraint,
	Validation,
} from '../../../../types/constraints.js'
import { TypeOfConstraint } from '../../../../types/enums.js'

const constraint: LessThanNConstraint = {
	constraintType: TypeOfConstraint.LESS_THAN_N,
	operand: 42,
}

test('[lessThanN] returns correct validation if integer less than constraint value', () => {
	const validation: Validation = {
		datatype: 'integer',
		value: 41,
	}

	expect(lessThanN(constraint)(validation)).toEqual(validation)
})

test('[lessThanN] returns error if integer more than constraint value', () => {
	const validation: Validation = {
		datatype: 'integer',
		value: 43,
	}

	expect(lessThanN(constraint)(validation)).toEqual({
		...validation,
		errors: [
			{
				constraint,
				error: TypeOfConstraint.LESS_THAN_N,
			},
		],
		isInvalid: true,
	})
})
