import type {
	InjectFromArgumentOperation,
	NumericOperation,
} from "../../../types"

import { right } from "@sitebender/fp/lib/either"
import { Option, some } from "@sitebender/fp/lib/option"
import evaluateNumericOperation from "../compose/evaluateNumericOperation"
import isInjectFromArgumentOperation from "../../utilities/isInjectFromArgumentOperation"
import { OperationResult } from "../operationResult/types"

export type LiftNumericF = (
	input: Option<number>,
) => (
	operand: number | InjectFromArgumentOperation | NumericOperation,
) => OperationResult<number>

const liftNumeric: LiftNumericF = input => action => {
	return typeof action === "number"
		? right(some(action))
		: isInjectFromArgumentOperation(action)
			? right(input)
			: evaluateNumericOperation(action)(input)
}

export default liftNumeric
