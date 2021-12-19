import makeIsFraction from './mod.js'
import {
	FractionTypeConstraint,
	Validation,
} from '../../../../types/constraints.js'
import { TypeOfConstraint } from '../../../../types/enums.js'
import { FractionValue } from '../../../../types/values.js'

const constraint: FractionTypeConstraint = {
	constraintType: TypeOfConstraint.IS_FRACTION,
}

test('[makeIsFraction] returns correct validation when value is a fraction', () => {
	const validation: Validation = {
		datatype: 'fraction',
		value: {
			denominator: 7,
			numerator: 22,
		},
	}

	expect(makeIsFraction(constraint)(validation)).toEqual(validation)
})

test('[makeIsFraction] returns error when numerator is not a number', () => {
	const validation: Validation & FractionValue = {
		datatype: 'fraction',
		value: {
			denominator: 7,
			// @ts-expect-error override for testing purposes
			numerator: undefined,
		},
	}

	expect(makeIsFraction(constraint)(validation)).toEqual({
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_FRACTION,
				constraint,
			},
		],
	})
})

test('[makeIsFraction] returns error when denominator is not a number', () => {
	const validation: Validation & FractionValue = {
		datatype: 'fraction',
		value: {
			// @ts-expect-error override for testing purposes
			denominator: undefined,
			numerator: 22,
		},
	}

	expect(makeIsFraction(constraint)(validation)).toEqual({
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_FRACTION,
				constraint,
			},
		],
	})
})

test('[makeIsFraction] returns error when denominator is zero', () => {
	const validation: Validation = {
		datatype: 'fraction',
		value: {
			denominator: 0,
			numerator: 22,
		},
	}

	expect(makeIsFraction(constraint)(validation)).toEqual({
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_FRACTION,
				constraint,
			},
		],
	})
})
