import type { SbRoundOperation } from "../../../types"
import type { OperationResult } from "../../../operations/operationResult/types"
import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import pipe from "@sitebender/fp/lib/functions/pipe"
import * as OpResult from "../../../operations/operationResult"
import liftNumeric from "../../../old/operations/liftNumerical"

export type RoundF = (
	operation: SbRoundOperation,
) => (input?: Option<number>) => OperationResult<number>

const round: RoundF =
	op =>
	(input = none) => {
		const factor = Math.pow(10, op.decimalPlaces || 0)

		return pipe(
			pipe(op.operand, liftNumeric(input)),
			OpResult.map(o => Math.round(o * factor) / factor),
		)
	}

export default round
