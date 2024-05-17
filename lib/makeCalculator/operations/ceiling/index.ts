import type { SbCeilingOperation } from "../../../types"
import type { OperationResult } from "../../../old/operations/operationResult/types"
import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import pipe from "@sitebender/fp/lib/functions/pipe"
import * as OpResult from "../../../old/operations/operationResult"
import liftNumeric from "../../../old/operations/liftNumerical"

export type CeilingF = (
	operation: SbCeilingOperation,
) => (input?: Option<number>) => OperationResult<number>

const ceiling: CeilingF =
	op =>
	(input = none) => {
		return pipe(
			pipe(op.operand, liftNumeric(input)),
			OpResult.map(o => Math.ceil(o)),
		)
	}

export default ceiling
