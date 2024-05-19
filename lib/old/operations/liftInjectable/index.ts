import { SbCastableValue, SbInjectableOperation, Reify } from "../../../types"

import { right } from "@sitebender/fp/lib/either"
import { Option, none, some } from "@sitebender/fp/lib/option"
import isInjectedArgument from "../../../operations/injected/isInjectedArgument"
import isInjectedConstant from "../../../operations/injected/isInjectedConstant"
import { OperationResult } from "../../../operations/operationResult/types"
import evaluateInjectableOperation from "../../../operations/injected/evaluateInjectableOperation"

export type LiftInjectableF = (
	input?: Option<Reify<SbCastableValue>>,
) => (operand: SbInjectableOperation) => OperationResult<Reify<SbCastableValue>>

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
