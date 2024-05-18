import type { SbAddOperation } from "../../../types"

import map from "@sitebender/fp/lib/array/map"
import { Option, none } from "@sitebender/fp/lib/option"
import { pipe } from "@sitebender/fp/lib/functions"

import { OperationResult } from "../../../operations/operationResult/types"
import * as OpResult from "../../../operations/operationResult"
import sum from "@sitebender/fp/lib/array/reduce/sum"
import liftNumeric from "../../../old/operations/liftNumerical"

export type AddF = (
	op: SbAddOperation,
) => (input?: Option<number>) => OperationResult<number>

const add: AddF =
	op =>
	(input = none) => {
		return pipe(
			op.addends,
			map(liftNumeric(input)),
			OpResult.sequence,
			OpResult.map(sum),
		)
	}

export default add
