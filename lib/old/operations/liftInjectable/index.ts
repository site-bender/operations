import { CastableValue, InjectableOperation, Reify } from "../../../types"

import { right } from "@sitebender/fp/lib/either"
import { Option, none, some } from "@sitebender/fp/lib/option"
import evaluateInjectableOperation from "../compose/evaluateInjectableOperation"
import { OperationResult } from "../operationResult/types"
import isInjectedArgument from "../../../operations/injected/isInjectedArgument"
import isInjectedConstant from "../../../operations/injected/isInjectedConstant"

export type LiftInjectableF = (
	input?: Option<Reify<CastableValue>>,
) => (operand: InjectableOperation) => OperationResult<Reify<CastableValue>>

const liftInjectable: LiftInjectableF =
	(input = none) =>
	action => {
		return isInjectedConstant(action)
			? right(some(action.value))
			: isInjectedArgument(action)
				? right(input)
				: evaluateInjectableOperation(action)(input)
	}

export default liftInjectable
