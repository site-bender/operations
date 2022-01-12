import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import type {
	AndConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import { TypeOfConstraint } from "../../../../types/enums.ts"
import and from "./mod.ts"

const constraint: AndConstraint = {
	constraintType: TypeOfConstraint.AND,
	tests: [
		{
			constraintType: TypeOfConstraint.AT_LEAST_N,
			operand: 25,
		},
		{
			constraintType: TypeOfConstraint.AT_MOST_N,
			operand: 75,
		},
	],
}

const validate = and(constraint)

Deno.test("[and] passes when all constraint checks pass", () => {
	const validation: Validation = {
		numberType: "integer",
		errors: undefined,
		isInvalid: undefined,
		datatype: "integer",
		value: 50,
	}

	assertEquals(validate(validation), validation)
})

Deno.test("[and] fails when any constraint checks fails", () => {
	const validation: Validation = {
		numberType: "integer",
		datatype: "integer",
		value: 0,
	}

	assertEquals(validate(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				constraint: {
					constraintType: TypeOfConstraint.AND,
					tests: [
						{
							constraintType: TypeOfConstraint.AT_LEAST_N,
							datatype: "integer",
							operand: 25,
						},
						{
							constraintType: TypeOfConstraint.AT_MOST_N,
							datatype: "integer",
							operand: 75,
						},
					],
				},
				error: TypeOfConstraint.AND,
				errorMessage: "",
				errors: [
					{
						error: TypeOfConstraint.AT_LEAST_N,
						constraint: {
							constraintType: TypeOfConstraint.AT_LEAST_N,
							datatype: "integer",
							operand: 25,
						},
					},
				],
			},
		],
	})

	const validation2: Validation = {
		numberType: "integer",
		datatype: "integer",
		value: 100,
	}

	assertEquals(validate(validation2), {
		...validation2,
		isInvalid: true,
		errors: [
			{
				constraint: {
					constraintType: TypeOfConstraint.AND,
					tests: [
						{
							constraintType: TypeOfConstraint.AT_LEAST_N,
							datatype: "integer",
							operand: 25,
						},
						{
							constraintType: TypeOfConstraint.AT_MOST_N,
							datatype: "integer",
							operand: 75,
						},
					],
				},
				error: TypeOfConstraint.AND,
				errors: [
					{
						error: TypeOfConstraint.AT_MOST_N,
						constraint: {
							constraintType: TypeOfConstraint.AT_MOST_N,
							datatype: "integer",
							operand: 75,
						},
					},
				],
			},
		],
	})
})

Deno.test("[and] fails when both constraint checks fail", () => {
	const validator = and({
		constraintType: TypeOfConstraint.AND,
		tests: [
			{
				constraintType: TypeOfConstraint.AT_LEAST_N,
				operand: 75,
			},
			{
				constraintType: TypeOfConstraint.AT_MOST_N,
				operand: 25,
			},
		],
	})

	const validation: Validation = {
		numberType: "integer",
		datatype: "integer",
		value: 50,
	}

	assertEquals(validator(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				constraint: {
					constraintType: TypeOfConstraint.AND,
					tests: [
						{
							constraintType: TypeOfConstraint.AT_LEAST_N,
							datatype: "integer",
							operand: 75,
						},
						{
							constraintType: TypeOfConstraint.AT_MOST_N,
							datatype: "integer",
							operand: 25,
						},
					],
				},
				error: TypeOfConstraint.AND,
				errors: [
					{
						error: TypeOfConstraint.AT_LEAST_N,
						constraint: {
							constraintType: TypeOfConstraint.AT_LEAST_N,
							datatype: "integer",
							operand: 75,
						},
					},
					{
						error: TypeOfConstraint.AT_MOST_N,
						constraint: {
							constraintType: TypeOfConstraint.AT_MOST_N,
							datatype: "integer",
							operand: 25,
						},
					},
				],
			},
		],
	})
})
