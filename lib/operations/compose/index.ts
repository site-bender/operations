import { Option, none, some } from "@sitebender/fp/lib/option"
import evaluateBooleanOperation from "./evaluateBooleanOperation"
import evaluateInjectableOperation from "./evaluateInjectableOperation"
import evaluateNumericOperation from "./evaluateNumericOperation"
import isBooleanOperation from "../../utilities/isBooleanOperation"
import isInjectableOperation from "../../utilities/isUnitOperation"
import isNumericOperation from "../../utilities/isNumericOperation"
import isLookupOperation from "../../utilities/isLookupOperation"
import evaluateLookupOperation from "./evaluateLookupOperation"
import { CastableValue, Operation, Reify } from "../../types"
import { pipe } from "@sitebender/fp/lib/functions"
import { OperationResult } from "../operationResult/types"
import { left, map } from "@sitebender/fp/lib/either"

export type ComposeOperations = (
	o: Operation,
) => (
	input?: Option<Reify<CastableValue>>,
) => OperationResult<Reify<CastableValue>>
const composeOperations: ComposeOperations =
	op =>
	(input = none) => {
		if (isNumericOperation(op)) {
			return evaluateNumericOperation(op)(input as Option<number>)
		} else if (isBooleanOperation(op)) {
			return pipe(evaluateBooleanOperation(op)(), map(some)) as OperationResult<
				Reify<CastableValue>
			>
		} else if (isInjectableOperation(op)) {
			return evaluateInjectableOperation(op)(input)
		} else if (isLookupOperation(op)) {
			return evaluateLookupOperation(op)(input)
		}

		return left([`Unknown operation: ${op}.`])
	}

export default composeOperations
