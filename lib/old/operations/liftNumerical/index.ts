import {
	type InjectFromArgumentOperation,
	type NumericConstant,
	type NumericOperation,
} from "../../../types"

import { right } from "@sitebender/fp/lib/either"
import { Option, some } from "@sitebender/fp/lib/option"
import evaluateNumericOperation from "../compose/evaluateNumericOperation"
import isInjectFromArgumentOperation from "../../utilities/isInjectFromArgumentOperation"
import { OperationResult } from "../operationResult/types"
import isNumericConstant from "../../../constants/numericConstant/isNumericConstant"

export type LiftNumericF = (
	input: Option<number>,
) => (
	operand: NumericConstant | InjectFromArgumentOperation | NumericOperation,
) => OperationResult<number>

const liftNumeric: LiftNumericF = input => action => {
	return isNumericConstant(action)
		? right(some(action.value))
		: isInjectFromArgumentOperation(action)
			? right(input)
			: evaluateNumericOperation(action)(input)
}

export default liftNumeric
