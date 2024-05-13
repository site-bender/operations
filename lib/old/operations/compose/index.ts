import { Option, none, some } from "@sitebender/fp/lib/option"
import evaluateBooleanOperation from "./evaluateBooleanOperation"
import evaluateInjectableOperation from "./evaluateInjectableOperation"
import evaluateNumericOperation from "./evaluateNumericOperation"
import isNumericOperation from "../../utilities/isNumericOperation"
import { CastableValue, Operation, Reify } from "../../../types"
import { pipe } from "@sitebender/fp/lib/functions"
import { OperationResult } from "../operationResult/types"
import { left, map } from "@sitebender/fp/lib/either"
import isAlgebraicOperation from "../../../operations/algebraic/isAlgebraicOperation"
import isInjectedOperation from "../../../operations/injected/isInjectedOperation"
import isConditionalOperation from "../../../operations/conditional/isConditionalOperation"
import evaluateConditionalNumericOperation from "./evaluateConditionalOperation"

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
		} else if (isConditionalOperation(op)) {
			return evaluateConditionalNumericOperation(op)(input as Option<number>)
		} else if (isAlgebraicOperation(op)) {
			return pipe(evaluateBooleanOperation(op)(), map(some))
		} else if (isInjectedOperation(op)) {
			return evaluateInjectableOperation(op)(input)
		}

		return left([`Unknown operation: ${op}.`])
	}

export default composeOperations
