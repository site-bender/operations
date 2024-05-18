import type { SbMultiplyOperation } from "../../../types"

import { Option, none } from "@sitebender/fp/lib/option"
import { Either } from "@sitebender/fp/lib/either"
import { map } from "@sitebender/fp/lib/array"
import { default as multiplyArray } from "@sitebender/fp/lib/array/reduce/multiply"
import pipe from "@sitebender/fp/lib/functions/pipe"
import * as OpResult from "../../../operations/operationResult"
import liftNumeric from "../../../old/operations/liftNumerical"

export type MultiplyF = (
	op: SbMultiplyOperation,
) => (input?: Option<number>) => Either<Array<string>, Option<number>>

const multiply: MultiplyF =
	op =>
	(input = none) => {
		return pipe(
			op.multipliers,
			map(liftNumeric(input)),
			OpResult.sequence,
			OpResult.map(multiplyArray),
		)
	}

export default multiply
