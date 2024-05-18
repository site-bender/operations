import { SbConditionalOperation } from "../../../types"

import { Option, map, some } from "@sitebender/fp/lib/option"
import { OperationResult } from "../../../operations/operationResult/types"
import pipe from "@sitebender/fp/lib/functions/pipe"
import { match, right } from "@sitebender/fp/lib/either"
import evaluateConditionalNumericOperation from "../evaluateConditionalOperation"

export type LiftConditionalF = (
	input: Option<number>,
) => (operand: SbConditionalOperation) => OperationResult<boolean>

const liftConditional: LiftConditionalF = input => action => {
	return pipe(evaluateConditionalNumericOperation(action)(input), a =>
		pipe(
			(r: Option<number>) => pipe(map(_ => true)(r), right),
			match(() => right(some(false))),
		)(a),
	)
}

export default liftConditional
