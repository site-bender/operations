import disjointSet from './mod.ts'
import {
	DisjointSetConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: DisjointSetConstraint = {
	constraintType: TypeOfConstraint.DISJOINT_SET,
	operand: 'red,blue,green',
}

Deno.test(
	'[disjointSet] returns correct validation if value set and constraint set share no members',
	() => {
		const validation: Validation = {
			datatype: 'set',
			value: 'cyan,magenta,yellow,black',
		}

		assertEquals(disjointSet(constraint)(validation), validation)
	},
)

Deno.test('[disjointSet] returns correct validation with arrays', () => {
	const validation: Validation = {
		datatype: 'set',
		value: ['cyan', 'magenta', 'yellow', 'black'],
	}

	assertEquals(
		disjointSet({
			...constraint,
			operand: ['red', 'green', 'blue'],
		})(validation),
		validation,
	)
})

Deno.test('[disjointSet] returns correct validation with sets', () => {
	const validation: Validation = {
		datatype: 'set',
		value: new Set(['cyan', 'magenta', 'yellow', 'black']),
	}

	assertEquals(
		disjointSet({
			...constraint,
			operand: new Set(['red', 'green', 'blue']),
		})(validation),
		validation,
	)
})

Deno.test(
	'[disjointSet] returns error if value set and constraint set share members',
	() => {
		const validation: Validation = {
			datatype: 'set',
			value: 'red,yellow,black',
		}

		assertEquals(disjointSet(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.DISJOINT_SET,
				},
			],
			isInvalid: true,
		})
	},
)
