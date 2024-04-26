import type { FromParamOperation, NumericOperation } from "../../../types"

import { right } from "@sitebender/fp/lib/either"
import { Option, some } from "@sitebender/fp/lib/option"
import evaluateNumericOperation from "../compose/evaluateNumericOperation"
import isFromParamOperation from "../../utilities/isFromParamOperation"
import { OperationResult } from "../operationResult/types"

export type LiftNumericF = (
	input: Option<number>,
) => (
	operand: number | FromParamOperation | NumericOperation,
) => OperationResult<number>

const liftNumeric: LiftNumericF = input => action => {
	return typeof action === "number"
		? right(some(action))
		: isFromParamOperation(action)
			? right(input)
			: evaluateNumericOperation(action)(input)
}

export default liftNumeric
