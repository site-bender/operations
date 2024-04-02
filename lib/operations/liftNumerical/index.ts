import { right } from "../../fp/either"
import { some } from "../../fp/option"

import evaluateNumericOperations from "../../operations/compose/evaluateNumericOperations"

type LiftNumericF = (
	operand: number | NumericOperation,
) => Either<string[], Option<number>>

const liftNumeric: LiftNumericF = operand =>
	typeof operand === "number"
		? right(some(operand))
		: evaluateNumericOperations(operand)()

export default liftNumeric
