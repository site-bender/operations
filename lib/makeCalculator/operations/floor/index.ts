import type { SbFloorOperation } from "../../../types"
import type { OperationResult } from "../../../operations/operationResult/types"
import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import pipe from "@sitebender/fp/lib/functions/pipe"
import * as OpResult from "../../../operations/operationResult"
import liftNumeric from "../../../old/operations/liftNumerical"

export type FloorF = (
	operation: SbFloorOperation,
) => (input?: Option<number>) => OperationResult<number>

const floor: FloorF =
	op =>
	(input = none) => {
		return pipe(
			pipe(op.operand, liftNumeric(input)),
			OpResult.map(o => Math.floor(o)),
		)
	}

export default floor
