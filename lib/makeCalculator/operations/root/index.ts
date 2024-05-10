import type { RootOperation } from "../../../types"

import { Option, none } from "@sitebender/fp/lib/option"
import * as OpResult from "../../../old/operations/operationResult"
import liftNumeric from "../../../old/operations/liftNumerical"
import pipe from "@sitebender/fp/lib/functions/pipe"
import { map } from "@sitebender/fp/lib/array"
import { OperationResult } from "../../../old/operations/operationResult/types"

export type RootF = (
	operation: RootOperation,
) => (input?: Option<number>) => OperationResult<number>

const root: RootF =
	operation =>
	(input = none) => {
		//const doTruncation = (n: number) =>
		//	operation.truncation ? truncate(operation)(n) : n

		return pipe(
			[operation.radicand, operation.index],
			map(liftNumeric(input)),
			OpResult.sequence,
			OpResult.map(([radicand, index]) => Math.pow(radicand, 1 / index)),
			//OpResult.map(doTruncation),
		)
	}

export default root
