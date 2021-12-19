import subset from './mod.ts'
import type {
	SubsetConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: SubsetConstraint = {
	constraintType: TypeOfConstraint.SUBSET,
	operand: 'red,yellow,green,cyan,blue,magenta',
}

Deno.test(
	'[subset] returns correct validation if value set is a subset of the constraint set',
	() => {
		const validation: Validation = {
			datatype: 'set',
			value: 'cyan,red,yellow,blue',
		}

		assertEquals(subset(constraint)(validation), validation)
	},
)

Deno.test('[subset] returns correct validation with arrays', () => {
	const validation: Validation = {
		datatype: 'set',
		value: ['red', 'yellow', 'blue'],
	}

	assertEquals(
		subset({
			...constraint,
			operand: ['cyan', 'red', 'yellow', 'blue'],
		})(validation),
		validation,
	)
})

Deno.test('[subset] returns correct validation with sets', () => {
	const validation: Validation = {
		datatype: 'set',
		value: new Set(['cyan', 'magenta', 'blue']),
	}

	assertEquals(
		subset({
			...constraint,
			operand: new Set(['cyan', 'magenta', 'yellow', 'blue']),
		})(validation),
		validation,
	)
})

Deno.test(
	'[subset] returns correct validation if value set has no members (is empty)',
	() => {
		const validation: Validation = {
			datatype: 'set',
			value: [],
		}

		assertEquals(subset(constraint)(validation), validation)
	},
)

Deno.test(
	'[subset] returns error if value set has members not in constraint set',
	() => {
		const validation: Validation = {
			datatype: 'set',
			value: 'cyan,magenta,yellow,black',
		}

		assertEquals(subset(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.SUBSET,
				},
			],
			isInvalid: true,
		})
	},
)

Deno.test(
	'[subset] returns error if value set is identical to constraint set',
	() => {
		const validation: Validation = {
			datatype: 'set',
			value: 'cyan,blue,magenta,red,yellow,green',
		}

		assertEquals(subset(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.SUBSET,
				},
			],
			isInvalid: true,
		})
	},
)
