import { right } from "../../fp/either"
import { some } from "../../fp/option"

import evaluateNumericOperation from "../../operations/compose/evaluateNumericOperation"

type LiftNumericF = (
	operand: number | NumericOperation,
) => Either<string[], Option<number>>

const liftNumeric: LiftNumericF = operand =>
	typeof operand === "number"
		? right(some(operand))
		: evaluateNumericOperation(operand)()

export default liftNumeric
