import type { Either } from "fp-ts/lib/Either"
import { left } from "fp-ts/lib/Either"

import evaluateNumericOperations from "./evaluateNumericOperations"
import evaluateBooleanOperation from "./evaluateBooleanOperation"
import evaluateUnitOperations from "./evaluateUnitOperations"
import isBooleanOperation from "../../utilities/isBooleanOperation"
import isNumericOperation from "../../utilities/isNumericOperation"
import isUnitOperation from "../../utilities/isUnitOperation"

type ComposeOperations = (
	o: Operation,
) => () => Either<Array<string>, Option<number> | number | boolean>
const composeOperations: ComposeOperations = op => {
	if (isNumericOperation(op)) {
		return evaluateNumericOperations(op)
	} else if (isBooleanOperation(op)) {
		return evaluateBooleanOperation(op)
	} else if (isUnitOperation(op)) {
		return evaluateUnitOperations(op)
	}

	return () => left([`Unknown operation: ${op}.`])
}

export default composeOperations
