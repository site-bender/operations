import { SbAllowedNumericOperands } from "../../../types"

import { right } from "@sitebender/fp/lib/either"
import { Option, some } from "@sitebender/fp/lib/option"
import evaluateNumericOperation from "../compose/evaluateNumericOperation"
import { OperationResult } from "../../../operations/operationResult/types"
import isInjectedNumber from "../../../operations/injected/isInjectedConstant/isInjectedNumber"
import isInjectedNumberArg from "../../../operations/injected/isInjectedArgument/isInjectedNumberArg"
import isInjectedNumberFromForm from "../../../operations/injected/isInjectedFromForm/isInjectedNumberFromForm"
import evaluateInjectableOperationOfType from "../../../operations/injected/evaluateInjectableOperationOfType"
import evaluateLookupOperation from "../compose/evaluateLookupOperation"
import isInjectedNumberFromMap from "../../../operations/injected/isInjectedFromLookup/isInjectedNumberFromMap"

export type LiftNumericF = (
	input: Option<number>,
) => (operand: SbAllowedNumericOperands) => OperationResult<number>

const liftNumeric: LiftNumericF = input => action => {
	if (isInjectedNumber(action)) return right(some(action.value))

	if (isInjectedNumberArg(action)) return right(input)

	if (isInjectedNumberFromForm(action))
		return evaluateInjectableOperationOfType(action)(input)

	if (isInjectedNumberFromMap(action))
		return evaluateLookupOperation(action)(input)

	return evaluateNumericOperation(action)(input)
}

export default liftNumeric
