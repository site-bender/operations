import { type NegateOperation } from "../../../types"

import { Option, none, some } from "@sitebender/fp/lib/option"
import { right } from "@sitebender/fp/lib/either"
import pipe from "@sitebender/fp/lib/functions/pipe"
import * as OpResult from "../../../old/operations/operationResult"
import isInjectFromArgumentOperation from "../../../old/utilities/isInjectFromArgumentOperation"
import evaluateNumericOperation from "../../../old/operations/compose/evaluateNumericOperation"
import { OperationResult } from "../../../old/operations/operationResult/types"
import isNumericConstant from "../../../constants/numericConstant/isNumericConstant"

export type Negate = (
	operation: NegateOperation,
) => (input?: Option<number>) => OperationResult<number>

const negate: Negate =
	op =>
	(input = none) => {
		const operand = isNumericConstant(op.operand)
			? right(some(op.operand.value))
			: isInjectFromArgumentOperation(op.operand)
				? right(input)
				: evaluateNumericOperation(op.operand)(input)

		return pipe(
			operand,
			OpResult.map(o => -o),
		)
	}

export default negate
