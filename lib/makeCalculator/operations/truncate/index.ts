import type { SbTruncateOperation } from "../../../types"
import type { OperationResult } from "../../../operations/operationResult/types"
import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import pipe from "@sitebender/fp/lib/functions/pipe"
import * as OpResult from "../../../operations/operationResult"
import liftNumeric from "../../../old/operations/liftNumerical"

export type TruncateF = (
	operation: SbTruncateOperation,
) => (input?: Option<number>) => OperationResult<number>

const transform = (method: string): ((n: number) => number) => {
	switch (method) {
		case "ceiling":
			return Math.ceil
		case "floor":
			return Math.floor
		case "round":
			return Math.round
		default:
			return Math.trunc
	}
}

const truncate: TruncateF =
	op =>
	(input = none) => {
		const factor = Math.pow(10, op.decimalPlaces || 0)

		return pipe(
			pipe(op.operand, liftNumeric(input)),
			OpResult.map(o => transform(op.method)(o * factor) / factor),
		)
	}

export default truncate
