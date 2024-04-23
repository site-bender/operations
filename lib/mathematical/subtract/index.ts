import type { SubtractOperation } from "../../types"

import { Option, none, some } from "@sitebender/fp/lib/option"
import { left, right } from "@sitebender/fp/lib/either"
import pipe from "@sitebender/fp/lib/functions/pipe"
import * as OpResult from "../../operations/operationResult"
import { map } from "@sitebender/fp/lib/array"
import liftNumeric from "../../operations/liftNumerical"
import { OperationResult } from "../../operations/operationResult/types"

export type SubtractF = (
	o: SubtractOperation,
) => (input?: Option<number>) => OperationResult<number>

const subtract: SubtractF =
	op =>
	(input = none) => {
		return pipe(
			[op.minuend, op.subtrahend],
			map(liftNumeric(input)),
			OpResult.sequence,
			OpResult.flatMap(([minuend, subtrahend]) => {
				const difference = minuend - subtrahend

				return Number.isNaN(difference)
					? left(["Invalid numeric operation: divide."])
					: right(some(difference))
			}),
		)
	}

export default subtract
