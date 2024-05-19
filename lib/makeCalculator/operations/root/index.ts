import type { SbRootOperation } from "../../../types"

import { Option, none } from "@sitebender/fp/lib/option"
import * as OpResult from "../../../operations/operationResult"
import liftNumeric from "../../../old/operations/liftNumerical"
import pipe from "@sitebender/fp/lib/functions/pipe"
import { map } from "@sitebender/fp/lib/array"
import { OperationResult } from "../../../operations/operationResult/types"

export type RootF = (
	operation: SbRootOperation,
) => (input?: Option<number>) => OperationResult<number>

const root: RootF =
	operation =>
	(input = none) => {
		return pipe(
			[operation.radicand, operation.index],
			map(liftNumeric(input)),
			OpResult.sequence,
			OpResult.map(([radicand, index]) => Math.pow(radicand, 1 / index)),
		)
	}

export default root
