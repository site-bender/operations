import composeValidators from './mod.js'
import { Constraint, Validation } from '../types/constraints.js'
import { TypeOfConstraint } from '../types/enums.js'

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

test('[composeValidators] returns correct validation if value validates against constraint', () => {
	const validate = composeValidators(constraint)

	const validation: Validation = {
		value: 8,
	}

	expect(validate(validation)).toEqual(validation)
})

test('[composeValidators] returns error validation if given invalid value', () => {
	const validate = composeValidators(constraint)

	const validation: Validation = {
		value: 5,
	}

	expect(validate(validation)).toEqual({
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
})
