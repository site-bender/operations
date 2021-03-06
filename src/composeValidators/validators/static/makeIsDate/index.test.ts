import makeIsDate from '.'
import { DateTypeConstraint, Validation } from '../../../../types/constraints'
import { TypeOfConstraint } from '../../../../types/enums'
import { PlainDateValue } from '../../../../types/values'

const constraint: DateTypeConstraint = {
	constraintType: TypeOfConstraint.IS_DATE,
}

test('[makeIsDate] returns correct validation when value is a date', () => {
	const validation: Validation = {
		datatype: 'plainDate',
		value: '2000-01-01',
	}

	expect(makeIsDate(constraint)(validation)).toEqual(validation)
})

test('[makeIsDate] returns error when value is not a date', () => {
	const validation: Validation & PlainDateValue = {
		datatype: 'plainDate',
		// @ts-expect-error override for testing purposes
		value: 666,
	}

	expect(makeIsDate(constraint)(validation)).toEqual({
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_DATE,
				constraint,
				errorMessage: 'RangeError: invalid ISO 8601 string: 666',
			},
		],
	})
})
