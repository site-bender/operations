import { Option, none, some } from "@sitebender/fp/lib/option"
import evaluateNumericOperation from "./evaluateNumericOperation"
import isNumericOperation from "../../utilities/isNumericOperation"
import { SbCastableValue, SbOperation, Reify } from "../../../types"
import { pipe } from "@sitebender/fp/lib/functions"
import { left, map } from "@sitebender/fp/lib/either"
import isAlgebraicOperation from "../../../operations/algebraic/isAlgebraicOperation"
import isInjectedOperation from "../../../operations/injected/isInjectedOperation"
import isConditionalOperation from "../../../operations/conditional/isConditionalOperation"
import { OperationResult } from "../../../operations/operationResult/types"
import evaluateConditionalNumericOperation from "../../../operations/conditional/evaluateConditionalOperation"
import evaluateBooleanOperation from "../../../operations/algebraic/evaluateBooleanOperation"
import evaluateInjectableOperation from "../../../operations/injected/evaluateInjectableOperation"

export type ComposeOperations = (
	o: SbOperation,
) => (
	input?: Option<Reify<SbCastableValue>>,
) => OperationResult<Reify<SbCastableValue>>
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
