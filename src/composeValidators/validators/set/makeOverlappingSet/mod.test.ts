import overlappingSet from './mod.ts'
import {
	OverlappingSetConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: OverlappingSetConstraint = {
	constraintType: TypeOfConstraint.OVERLAPPING_SET,
	operand: 'red,blue,green',
}

Deno.test(
	'[overlappingSet] returns correct validation if value set and constraint set share some but not all members',
	() => {
		const validation: Validation = {
			datatype: 'set',
			value: 'cyan,red,yellow,blue',
		}

		assertEquals(overlappingSet(constraint)(validation), validation)
	},
)

Deno.test('[overlappingSet] returns correct validation with arrays', () => {
	const validation: Validation = {
		datatype: 'set',
		value: ['cyan', 'red', 'yellow', 'black'],
	}

	assertEquals(
		overlappingSet({
			...constraint,
			operand: ['red', 'green', 'blue'],
		})(validation),
		validation,
	)
})

Deno.test('[overlappingSet] returns correct validation with sets', () => {
	const validation: Validation = {
		datatype: 'set',
		value: new Set(['cyan', 'magenta', 'yellow', 'blue']),
	}

	assertEquals(
		overlappingSet({
			...constraint,
			operand: new Set(['red', 'green', 'blue']),
		})(validation),
		validation,
	)
})

Deno.test(
	'[overlappingSet] returns error if value set and constraint set share no members',
	() => {
		const validation: Validation = {
			datatype: 'set',
			value: 'cyan,magenta,yellow,black',
		}

		assertEquals(overlappingSet(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.OVERLAPPING_SET,
				},
			],
			isInvalid: true,
		})
	},
)

Deno.test(
	'[overlappingSet] returns error if value set and constraint set share all members',
	() => {
		const validation: Validation = {
			datatype: 'set',
			value: 'red,blue,green',
		}

		assertEquals(overlappingSet(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.OVERLAPPING_SET,
				},
			],
			isInvalid: true,
		})
	},
)
