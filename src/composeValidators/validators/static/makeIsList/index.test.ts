import makeIsList from '.'
import { ListTypeConstraint, Validation } from '../../../../types/constraints'
import { TypeOfConstraint } from '../../../../types/enums'
import { ListValue } from '../../../../types/values'

const constraint: ListTypeConstraint = {
	constraintType: TypeOfConstraint.IS_LIST,
}

test('[makeIsList] returns correct validation when value is a list', () => {
	const validation: Validation = {
		datatype: 'list',
		value: [],
	}

	expect(makeIsList(constraint)(validation)).toEqual(validation)
})

test('[makeIsList] returns error when value is not a list', () => {
	const validation: Validation & ListValue = {
		datatype: 'list',
		// @ts-expect-error override for testing purposes
		value: 666,
	}

	expect(makeIsList(constraint)(validation)).toEqual({
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_LIST,
				constraint,
			},
		],
	})
})
