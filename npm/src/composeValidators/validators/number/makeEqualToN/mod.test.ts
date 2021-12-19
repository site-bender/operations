import moreThanN from './mod.js'
import {
	EqualToNConstraint,
	Validation,
} from '../../../../types/constraints.js'
import { TypeOfConstraint } from '../../../../types/enums.js'

const constraint: EqualToNConstraint = {
	constraintType: TypeOfConstraint.EQUAL_TO_N,
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
				error: TypeOfConstraint.EQUAL_TO_N,
			},
		],
		isInvalid: true,
	})
})
