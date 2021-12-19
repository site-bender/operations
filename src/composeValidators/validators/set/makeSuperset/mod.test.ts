import superset from './mod.ts'
import {
	SupersetConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: SupersetConstraint = {
	constraintType: TypeOfConstraint.SUPERSET,
	operand: 'cyan,red,yellow,blue',
}

Deno.test(
	'[superset] returns correct validation if value set is a superset of the constraint set',
	() => {
		const validation: Validation = {
			datatype: 'set',
			value: 'red,yellow,green,cyan,blue,magenta',
		}

		assertEquals(superset(constraint)(validation), validation)
	},
)

Deno.test('[superset] returns correct validation with arrays', () => {
	const validation: Validation = {
		datatype: 'set',
		value: ['cyan', 'red', 'yellow', 'blue'],
	}

	assertEquals(
		superset({
			...constraint,
			operand: ['red', 'yellow', 'blue'],
		})(validation),
		validation,
	)
})

Deno.test('[superset] returns correct validation with sets', () => {
	const validation: Validation = {
		datatype: 'set',
		value: new Set(['cyan', 'magenta', 'yellow', 'blue']),
	}

	assertEquals(
		superset({
			...constraint,
			operand: new Set(['cyan', 'magenta', 'blue']),
		})(validation),
		validation,
	)
})

Deno.test(
	'[superset] returns correct validation if constraint set has no members (is empty)',
	() => {
		const validation: Validation = {
			datatype: 'set',
			value: 'cyan,red,yellow,blue',
		}

		assertEquals(
			superset({
				...constraint,
				operand: [],
			})(validation),
			validation,
		)
	},
)

Deno.test(
	'[superset] returns error if constraint set has members not in value set',
	() => {
		const validation: Validation = {
			datatype: 'set',
			value: 'cyan,red,yellow,black',
		}

		assertEquals(superset(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.SUPERSET,
				},
			],
			isInvalid: true,
		})
	},
)

Deno.test(
	'[superset] returns error if value set is identical to constraint set',
	() => {
		const validation: Validation = {
			datatype: 'set',
			value: 'cyan,red,yellow,blue',
		}

		assertEquals(superset(constraint)(validation), {
			...validation,
			errors: [
				{
					constraint,
					error: TypeOfConstraint.SUPERSET,
				},
			],
			isInvalid: true,
		})
	},
)
