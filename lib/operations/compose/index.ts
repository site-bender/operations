import type { Either } from "fp-ts/lib/Either"
import { left } from "fp-ts/lib/Either"

import add from "../../numerical/add"
import and from "../../booleans/and"
import compareNumbers from "../../logical/compareNumbers"
import divide from "../../numerical/divide"
import fromFormInput from "../../injectors/formInput"
import multiply from "../../numerical/multiply"
import negate from "../../numerical/negate"
import or from "../../booleans/or"
import power from "../../numerical/power"
import root from "../../numerical/root"
import subtract from "../../numerical/subtract"
import {
	isBooleanOperation,
	isFailOperation,
	isNumericOperation,
	isUnitOperation,
} from "../../operations"

const EncounteredFailureMessage = "Encountered a failed operation, aborting"

type EvaluateNumericOperations = (
	o: NumericOperation,
) => () => Either<Array<string>, number>
const evaluateNumericOperations: EvaluateNumericOperations = op => {
	switch (op.operation) {
		case "add":
			return add(op)
		case "multiply":
			return multiply(op)
		case "subtract":
			return subtract(op)
		case "divide":
			return divide(op)
		case "power":
			return power(op)
		case "root":
			return root(op)
		case "negate":
			return negate(op)
		case "equalTo":
		case "greaterThan":
		case "lessThan":
		case "noLessThan":
		case "noMoreThan":
		case "unequalTo":
			return compareNumbers(op)
		default:
			return () => left([`Invalid numeric operation ${op}`])
	}
}

type EvaluateBooleanOperations = (
	o: BooleanOperation,
) => () => Either<Array<string>, boolean>
const evaluateBooleanOperation: EvaluateBooleanOperations = op => {
	switch (op.operation) {
		case "and":
			return and(op)
		case "or":
			return or(op)
		default:
			return () => left([`Invalid boolean operation ${op}`])
	}
}

type EvaluateUnitOperations = (
	o: UnitOperation,
) => () => Either<Array<string>, number>
const evaluateUnitOperations: EvaluateUnitOperations = op => {
	switch (op.operation) {
		case "formInput":
			return fromFormInput(op)
		default:
			return () => left([`Invalid unit operation ${op}`])
	}
}

type ComposeOperations = (
	o: Operation,
) => () => Either<Array<string>, number | boolean | void>
const composeOperations: ComposeOperations = op => {
	if (isNumericOperation(op)) {
		return evaluateNumericOperations(op)
	} else if (isBooleanOperation(op)) {
		return evaluateBooleanOperation(op)
	} else if (isUnitOperation(op)) {
		return evaluateUnitOperations(op)
	} else if (isFailOperation(op)) {
		return () => left([EncounteredFailureMessage])
	}

	return () => left([`Unknown operation ${op}`])
}

export {
	EncounteredFailureMessage,
	composeOperations,
	evaluateUnitOperations,
	evaluateBooleanOperation,
	evaluateNumericOperations,
}
