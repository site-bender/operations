import { SbAllowedNumericOperands } from "../../../types"

import { right } from "@sitebender/fp/lib/either"
import { Option, some } from "@sitebender/fp/lib/option"
import evaluateNumericOperation from "../compose/evaluateNumericOperation"
import { OperationResult } from "../operationResult/types"
import isInjectedNumber from "../../../operations/injected/isInjectedConstant/isInjectedNumber"
import isInjectedNumberArg from "../../../operations/injected/isInjectedArgument/isInjectedNumberArg"
import isInjectedNumberFromForm from "../../../operations/injected/isInjectedFromForm/isInjectedNumberFromForm"
import evaluateInjectableOperationOfType from "../compose/evaluateInjectableOperationOfType"

export type LiftNumericF = (
	input: Option<number>,
) => (operand: SbAllowedNumericOperands) => OperationResult<number>

const liftNumeric: LiftNumericF = input => action => {
	return isInjectedNumber(action)
		? right(some(action.value))
		: isInjectedNumberArg(action)
			? right(input)
			: isInjectedNumberFromForm(action)
				? evaluateInjectableOperationOfType(action)(input)
				: evaluateNumericOperation(action)(input)
}

export default liftNumeric
