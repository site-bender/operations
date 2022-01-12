import { AtMostNConstraint, Validation } from "../../../../types/constraints.js"
import { TypeOfConstraint } from "../../../../types/enums.js"
import atMostN from "./mod.js"

const constraint: AtMostNConstraint = {
	constraintType: TypeOfConstraint.AT_MOST_N,
	operand: 42,
}

test("[atMostN] returns correct validation if integer less than constraint value", () => {
	const validation: Validation = {
		datatype: "integer",
		value: 41,
	}

	expect(atMostN(constraint)(validation)).toEqual(validation)
})

test("[atMostN] returns correct validation if integer equals constraint value", () => {
	const validation: Validation = {
		datatype: "integer",
		value: 42,
	}

	expect(atMostN(constraint)(validation)).toEqual(validation)
})

test("[atMostN] returns error if integer more than constraint value", () => {
	const validation: Validation = {
		datatype: "integer",
		value: 43,
	}

	expect(atMostN(constraint)(validation)).toEqual({
		...validation,
		errors: [
			{
				constraint,
				error: TypeOfConstraint.AT_MOST_N,
			},
		],
		isInvalid: true,
	})
})
