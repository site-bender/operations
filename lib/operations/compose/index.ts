import type { Operation } from "../../types"

import { Either, left } from "@sitebender/fp/lib/either"
import { Option } from "@sitebender/fp/lib/option"
import evaluateBooleanOperation from "./evaluateBooleanOperation"
import evaluateInjectableOperation from "./evaluateInjectableOperation"
import evaluateNumericOperation from "./evaluateNumericOperation"
import isBooleanOperation from "../../utilities/isBooleanOperation"
import isInjectableOperation from "../../utilities/isUnitOperation"
import isNumericOperation from "../../utilities/isNumericOperation"

export type ComposeOperations = (
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
