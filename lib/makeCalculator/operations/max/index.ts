import type { SbMaxOperation } from "../../../types"

import map from "@sitebender/fp/lib/array/map"
import { Option, none } from "@sitebender/fp/lib/option"
import { pipe } from "@sitebender/fp/lib/functions"

import { OperationResult } from "../../../operations/operationResult/types"
import * as OpResult from "../../../operations/operationResult"
import liftNumeric from "../../../old/operations/liftNumerical"

export type MaxF = (
	op: SbMaxOperation,
) => (input?: Option<number>) => OperationResult<number>

const max: MaxF =
	op =>
	(input = none) => {
		return pipe(
			[op.this, op.that],
			map(liftNumeric(input)),
			OpResult.sequence,
			OpResult.map(([x, y]) => (x >= y ? x : y)),
		)
	}

export default max
