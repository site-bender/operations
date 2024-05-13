import { AllowedNumericOperands } from "../../../types"

import { right } from "@sitebender/fp/lib/either"
import { Option, some } from "@sitebender/fp/lib/option"
import evaluateNumericOperation from "../compose/evaluateNumericOperation"
import { OperationResult } from "../operationResult/types"
import isInjectedNumber from "../../../operations/injected/isInjectedConstant/isInjectedNumber"
import isInjectedNumberArg from "../../../operations/injected/isInjectedArgument/isInjectedNumberArg"

export type LiftNumericF = (
	input: Option<number>,
) => (operand: AllowedNumericOperands) => OperationResult<number>

const liftNumeric: LiftNumericF = input => action => {
	return isInjectedNumber(action)
		? right(some(action.value))
		: isInjectedNumberArg(action)
			? right(input)
			: evaluateNumericOperation(action)(input)
}

export default liftNumeric
