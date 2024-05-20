import type { Option } from "@sitebender/fp/lib/option"
import type { SbTernaryOperation } from "../../../types"
import type { OperationResult } from "../../operationResult/types"

import evaluateConditionalNumericOperation from "../../conditional/evaluateConditionalOperation"
import liftNumeric from "../../../old/operations/liftNumerical"
import match from "@sitebender/fp/lib/either/match"
import none from "@sitebender/fp/lib/option/none"
import pipe from "@sitebender/fp/lib/functions/pipe"

type EvaluateTernaryOperation = (
	op: SbTernaryOperation,
) => (input?: Option<number>) => OperationResult<number>

const evaluateTernaryOperation: EvaluateTernaryOperation =
	op =>
	(input = none) =>
		pipe(
			input,
			evaluateConditionalNumericOperation(op.condition),
			a => pipe(
				() => op.onTrue,
				match(() => op.onFalse),
			)(a),
			liftNumeric(input),
		)

export default evaluateTernaryOperation
