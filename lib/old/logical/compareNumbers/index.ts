import type { SbConditionalOperation } from "../../../types"

import { flatMap, left, right } from "@sitebender/fp/lib/either"
import { Option, none } from "@sitebender/fp/lib/option"
import liftNumeric from "../../operations/liftNumerical"
import makeCompare from "./makeCompare"
import pipe from "@sitebender/fp/lib/functions/pipe"
import { map } from "@sitebender/fp/lib/array"
import * as OpResult from "../../operations/operationResult"
import { OperationResult } from "../../operations/operationResult/types"

export type CompareNumbers = (
	operation: SbConditionalOperation,
) => (input?: Option<number>) => OperationResult<number>

const compareNumbers: CompareNumbers =
	operation =>
	(input = none) => {
		return pipe(
			[operation.operand, operation.test],
			map(liftNumeric(input)),
			OpResult.sequence,
			OpResult.mapEither(([operand, test]) => {
				return pipe(
					makeCompare(operation.operation)(operand)(test)(),
					flatMap(result =>
						result
							? right(operand)
							: left([`${operand} is not ${operation.operation} ${test}.`]),
					),
				)
			}),
		)
	}

export default compareNumbers
