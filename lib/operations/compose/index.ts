import type { Either } from "fp-ts/lib/Either"
import { left } from "fp-ts/lib/Either"

import evaluateNumericOperation from "./evaluateNumericOperation"
import evaluateBooleanOperation from "./evaluateBooleanOperation"
import evaluateInjectableOperation from "./evaluateInjectableOperation"
import isBooleanOperation from "../../utilities/isBooleanOperation"
import isNumericOperation from "../../utilities/isNumericOperation"
import isInjectableOperation from "../../utilities/isUnitOperation"

type ComposeOperations = (
	o: Operation,
) => () => Either<Array<string>, Option<number> | number | boolean | string>
const composeOperations: ComposeOperations = op => {
	if (isNumericOperation(op)) {
		return evaluateNumericOperation(op)
	} else if (isBooleanOperation(op)) {
		return evaluateBooleanOperation(op)
	} else if (isInjectableOperation(op)) {
		return evaluateInjectableOperation(op)
	}

	return () => left([`Unknown operation: ${op}.`])
}

export default composeOperations
