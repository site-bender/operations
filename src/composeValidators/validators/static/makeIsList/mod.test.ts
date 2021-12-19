import makeIsList from './mod.ts'
import {
	ListTypeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import type { ListValue } from '../../../../types/values.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: ListTypeConstraint = {
	constraintType: TypeOfConstraint.IS_LIST,
}

Deno.test(
	'[makeIsList] returns correct validation when value is a list',
	() => {
		const validation: Validation = {
			datatype: 'list',
			value: [],
		}

		assertEquals(makeIsList(constraint)(validation), validation)
	},
)

Deno.test('[makeIsList] returns error when value is not a list', () => {
	const validation: Validation & ListValue = {
		datatype: 'list',
		// @ts-ignore: for testing purposes
		value: 666,
	}

	assertEquals(makeIsList(constraint)(validation), {
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
