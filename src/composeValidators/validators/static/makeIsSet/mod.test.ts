import makeIsSet from './mod.ts'
import type {
	SetTypeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import type { SetValue } from '../../../../types/values.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: SetTypeConstraint = {
	constraintType: TypeOfConstraint.IS_SET,
}

Deno.test('[makeIsSet] returns correct validation when value is a set', () => {
	const stringValidation: Validation = {
		datatype: 'set',
		value: 'red,green,blue',
	}

	assertEquals(makeIsSet(constraint)(stringValidation), stringValidation)

	const arrayValidation: Validation = {
		datatype: 'set',
		value: [1, 4, 9, 16, 25],
	}

	assertEquals(makeIsSet(constraint)(arrayValidation), arrayValidation)

	const setValidation: Validation = {
		datatype: 'set',
		value: new Set([3.3, 4.4, 5.5]),
	}

	assertEquals(makeIsSet(constraint)(setValidation), setValidation)
})

Deno.test('[makeIsSet] returns error when value is not a set', () => {
	const validation: Validation & SetValue = {
		datatype: 'set',
		// @ts-ignore: for testing purposes
		value: 666,
	}

	assertEquals(makeIsSet(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_SET,
				constraint,
				errorMessage: "Cannot use 'in' operator to search for 'size' in 666",
			},
		],
	})

	const unsetValidation: Validation = {
		datatype: 'set',
		value: 'red,green,blue,red,green',
	}

	assertEquals(makeIsSet(constraint)(unsetValidation), {
		...unsetValidation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_SET,
				constraint,
			},
		],
	})
})
