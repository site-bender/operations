import { assertEquals } from "https://deno.land/std@0.118.0/testing/asserts.ts"
import type { Constraint, Validation } from "../types/constraints.ts"
import { TypeOfConstraint } from "../types/enums.ts"
import composeValidators from "./mod.ts"

const constraint: Constraint = {
	constraintType: TypeOfConstraint.AND,
	tests: [
		{
			constraintType: TypeOfConstraint.IS_INTEGER,
		},
		{
			constraintType: TypeOfConstraint.OR,
			tests: [
				{
					constraintType: TypeOfConstraint.AND,
					tests: [
						{
							constraintType: TypeOfConstraint.AT_LEAST_N,
							operand: 7,
						},
						{
							constraintType: TypeOfConstraint.LESS_THAN_N,
							operand: 11,
						},
					],
				},
				{
					constraintType: TypeOfConstraint.AND,
					tests: [
						{
							constraintType: TypeOfConstraint.MORE_THAN_N,
							operand: 21,
						},
						{
							constraintType: TypeOfConstraint.AT_MOST_N,
							operand: 42,
						},
					],
				},
			],
		},
	],
}

Deno.test(
	"[composeValidators] returns correct validation if value validates against constraint",
	() => {
		const validate = composeValidators(constraint)

		const validation: Validation = {
			datatype: "integer",
			errors: undefined,
			isInvalid: undefined,
			value: 8,
		}

		assertEquals(validate(validation), validation)
	},
)

Deno.test(
	"[composeValidators] returns error validation if given invalid value",
	() => {
		const validate = composeValidators(constraint)

		const validation: Validation = {
			datatype: "integer",
			value: 5,
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
								constraintType: TypeOfConstraint.IS_INTEGER,
							},
							{
								constraintType: TypeOfConstraint.OR,
								tests: [
									{
										constraintType: TypeOfConstraint.AND,
										tests: [
											{
												constraintType: TypeOfConstraint.AT_LEAST_N,
												operand: 7,
											},
											{
												constraintType: TypeOfConstraint.LESS_THAN_N,
												operand: 11,
											},
										],
									},
									{
										constraintType: TypeOfConstraint.AND,
										tests: [
											{
												constraintType: TypeOfConstraint.MORE_THAN_N,
												operand: 21,
											},
											{
												constraintType: TypeOfConstraint.AT_MOST_N,
												operand: 42,
											},
										],
									},
								],
							},
						],
					},
					error: TypeOfConstraint.AND,
					errorMessage: "",
					errors: [
						{
							constraint: {
								constraintType: TypeOfConstraint.OR,
								tests: [
									{
										constraintType: TypeOfConstraint.AND,
										tests: [
											{
												constraintType: TypeOfConstraint.AT_LEAST_N,
												operand: 7,
											},
											{
												constraintType: TypeOfConstraint.LESS_THAN_N,
												operand: 11,
											},
										],
									},
									{
										constraintType: TypeOfConstraint.AND,
										tests: [
											{
												constraintType: TypeOfConstraint.MORE_THAN_N,
												operand: 21,
											},
											{
												constraintType: TypeOfConstraint.AT_MOST_N,
												operand: 42,
											},
										],
									},
								],
							},
							error: TypeOfConstraint.OR,
							errorMessage: "",
							errors: [
								{
									constraint: {
										constraintType: TypeOfConstraint.AND,
										tests: [
											{
												constraintType: TypeOfConstraint.AT_LEAST_N,
												operand: 7,
											},
											{
												constraintType: TypeOfConstraint.LESS_THAN_N,
												operand: 11,
											},
										],
									},
									error: TypeOfConstraint.AND,
									errorMessage: "",
									errors: [
										{
											error: TypeOfConstraint.LESS_THAN_N,
											constraint: {
												constraintType: TypeOfConstraint.AT_LEAST_N,
												operand: 7,
											},
										},
									],
								},
								{
									constraint: {
										constraintType: TypeOfConstraint.AND,
										tests: [
											{
												constraintType: TypeOfConstraint.MORE_THAN_N,
												operand: 21,
											},
											{
												constraintType: TypeOfConstraint.AT_MOST_N,
												operand: 42,
											},
										],
									},
									error: TypeOfConstraint.AND,
									errorMessage: "",
									errors: [
										{
											error: TypeOfConstraint.AT_MOST_N,
											constraint: {
												constraintType: TypeOfConstraint.MORE_THAN_N,
												operand: 21,
											},
										},
									],
								},
							],
						},
					],
				},
			],
		})
	},
)
