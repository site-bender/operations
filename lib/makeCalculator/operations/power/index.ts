import type { PowerOperation } from "../../../types"

import { Option, none } from "@sitebender/fp/lib/option"
import liftNumeric from "../../../old/operations/liftNumerical"
import pipe from "@sitebender/fp/lib/functions/pipe"
import { map } from "@sitebender/fp/lib/array"
import * as OpResult from "../../../old/operations/operationResult"
import { OperationResult } from "../../../old/operations/operationResult/types"

export type PowerF = (
	operation: PowerOperation,
) => (input?: Option<number>) => OperationResult<number>

const power: PowerF =
	op =>
	(input = none) => {
		return pipe(
			[op.base, op.exponent],
			map(liftNumeric(input)),
			OpResult.sequence,
			OpResult.map(([base, exponent]) => Math.pow(base, exponent)),
		)
	}

export default power
