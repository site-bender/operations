import type { DivideOperation } from "../../types"

import { Option, none, some } from "@sitebender/fp/lib/option"
import { left, right } from "@sitebender/fp/lib/either"
import pipe from "@sitebender/fp/lib/functions/pipe"
import * as OpResult from "../../operations/operationResult"
import liftNumeric from "../../operations/liftNumerical"
import { map } from "@sitebender/fp/lib/array"
import { OperationResult } from "../../operations/operationResult/types"

export type Divide = (
	operation: DivideOperation,
) => (input?: Option<number>) => OperationResult<number>

const divide: Divide =
	op =>
	(input = none) => {
		return pipe(
			[op.dividend, op.divisor],
			map(liftNumeric(input)),
			OpResult.sequence,
			OpResult.flatMap(([dividend, divisor]) => {
				const quotient = dividend / divisor

				return Number.isNaN(quotient) || quotient === Infinity
					? left(["Invalid numeric operation: divide."])
					: right(some(quotient))
			}),
		)
	}

export default divide
