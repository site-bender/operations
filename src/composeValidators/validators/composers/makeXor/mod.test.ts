import xor from './mod.ts'
import type {
	Validation,
	XorConstraint,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: XorConstraint = {
	constraintType: TypeOfConstraint.XOR,
	tests: [
		{
			constraintType: TypeOfConstraint.MEMBER,
			operand: ['red', 'green', 'blue'],
		},
		{
			constraintType: TypeOfConstraint.MEMBER,
			operand: ['cyan', 'magenta', 'yellow', 'blue'],
		},
		{
			constraintType: TypeOfConstraint.MEMBER,
			operand: ['chartreuse', 'mauve', 'yellow', 'blue'],
		},
	],
}

const validate = xor(constraint)

Deno.test('[xor] passes when one constraint check passes', () => {
	const validation: Validation = {
		datatype: 'member',
		value: 'red',
	}

	assertEquals(validate(validation), validation)
})

Deno.test('[xor] fails when more than one constraint check passes', () => {
	const validation: Validation = {
		datatype: 'member',
		value: 'yellow',
	}

	assertEquals(validate(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				constraint: {
					constraintType: TypeOfConstraint.XOR,
					tests: [
						{
							constraintType: TypeOfConstraint.MEMBER,
							operand: ['red', 'green', 'blue'],
						},
						{
							constraintType: TypeOfConstraint.MEMBER,
							operand: ['cyan', 'magenta', 'yellow', 'blue'],
						},
						{
							constraintType: TypeOfConstraint.MEMBER,
							operand: ['chartreuse', 'mauve', 'yellow', 'blue'],
						},
					],
				},
				error: TypeOfConstraint.XOR,
				errors: [
					{
						error: TypeOfConstraint.MEMBER,
						constraint: {
							constraintType: TypeOfConstraint.MEMBER,
							operand: ['red', 'green', 'blue'],
						},
					},
				],
			},
		],
	})
})

Deno.test('[xor] fails when all constraint checks pass', () => {
	const validation: Validation = {
		datatype: 'member',
		value: 'blue',
	}

	assertEquals(validate(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				constraint: {
					constraintType: TypeOfConstraint.XOR,
					tests: [
						{
							constraintType: TypeOfConstraint.MEMBER,
							operand: ['red', 'green', 'blue'],
						},
						{
							constraintType: TypeOfConstraint.MEMBER,
							operand: ['cyan', 'magenta', 'yellow', 'blue'],
						},
						{
							constraintType: TypeOfConstraint.MEMBER,
							operand: ['chartreuse', 'mauve', 'yellow', 'blue'],
						},
					],
				},
				error: TypeOfConstraint.XOR,
				errors: [],
			},
		],
	})
})

Deno.test('[xor] fails when all constraint checks fail', () => {
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
					constraintType: TypeOfConstraint.XOR,
					tests: [
						{
							constraintType: TypeOfConstraint.MEMBER,
							operand: ['red', 'green', 'blue'],
						},
						{
							constraintType: TypeOfConstraint.MEMBER,
							operand: ['cyan', 'magenta', 'yellow', 'blue'],
						},
						{
							constraintType: TypeOfConstraint.MEMBER,
							operand: ['chartreuse', 'mauve', 'yellow', 'blue'],
						},
					],
				},
				error: TypeOfConstraint.XOR,
				errors: [
					{
						error: TypeOfConstraint.MEMBER,
						constraint: {
							constraintType: TypeOfConstraint.MEMBER,
							operand: ['red', 'green', 'blue'],
						},
					},
					{
						error: TypeOfConstraint.MEMBER,
						constraint: {
							constraintType: TypeOfConstraint.MEMBER,
							operand: ['cyan', 'magenta', 'yellow', 'blue'],
						},
					},
					{
						error: TypeOfConstraint.MEMBER,
						constraint: {
							constraintType: TypeOfConstraint.MEMBER,
							operand: ['chartreuse', 'mauve', 'yellow', 'blue'],
						},
					},
				],
			},
		],
	})
})
