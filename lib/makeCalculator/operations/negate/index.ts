import { type SbNegateOperation } from "../../../types"

import { Option, none } from "@sitebender/fp/lib/option"
import pipe from "@sitebender/fp/lib/functions/pipe"
import * as OpResult from "../../../operations/operationResult"
import { OperationResult } from "../../../operations/operationResult/types"
import liftNumeric from "../../../old/operations/liftNumerical"

export type Negate = (
	operation: SbNegateOperation,
) => (input?: Option<number>) => OperationResult<number>

const negate: Negate =
	op =>
	(input = none) => {
		return pipe(
			pipe(op.operand, liftNumeric(input)),
			OpResult.map(o => -o),
		)
	}

export default negate
