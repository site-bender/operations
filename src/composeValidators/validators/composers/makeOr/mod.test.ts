import or from './mod.ts'
import type { OrConstraint, Validation } from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: OrConstraint = {
	constraintType: TypeOfConstraint.OR,
	tests: [
		{
			constraintType: TypeOfConstraint.MEMBER,
			operand: ['red', 'green', 'blue'],
		},
		{
			constraintType: TypeOfConstraint.MEMBER,
			operand: ['cyan', 'magenta', 'yellow', 'blue'],
		},
	],
}

const validate = or(constraint)

Deno.test('[or] passes when both or either constraint check passes', () => {
	const validation: Validation = {
		datatype: 'member',
		value: 'blue',
	}

	assertEquals(validate(validation), validation)

	const validation2: Validation = {
		datatype: 'member',
		value: 'red',
	}

	assertEquals(validate(validation2), validation2)

	const validation3: Validation = {
		datatype: 'member',
		value: 'yellow',
	}

	assertEquals(validate(validation3), validation3)
})

Deno.test('[or] fails when both constraint checks fail', () => {
	const validation: Validation = {
		datatype: 'member',
		value: 'orange',
	}

	assertEquals(validate(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				constraint: {
					constraintType: TypeOfConstraint.OR,
					tests: [
						{
							constraintType: TypeOfConstraint.MEMBER,
							datatype: 'set',
							value: ['red', 'green', 'blue'],
						},
						{
							constraintType: TypeOfConstraint.MEMBER,
							datatype: 'set',
							value: ['cyan', 'magenta', 'yellow', 'blue'],
						},
					],
				},
				error: TypeOfConstraint.OR,
				errors: [
					{
						error: TypeOfConstraint.MEMBER,
						constraint: {
							constraintType: TypeOfConstraint.MEMBER,
							datatype: 'set',
							value: ['red', 'green', 'blue'],
						},
					},
					{
						error: TypeOfConstraint.MEMBER,
						constraint: {
							constraintType: TypeOfConstraint.MEMBER,
							datatype: 'set',
							value: ['cyan', 'magenta', 'yellow', 'blue'],
						},
					},
				],
			},
		],
	})
})
