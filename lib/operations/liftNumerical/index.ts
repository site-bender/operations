import { Either, right } from "@sitebender/fp/lib/either"
import { Option, some } from "@sitebender/fp/lib/option"

import evaluateNumericOperation from "../../operations/compose/evaluateNumericOperation"

type LiftNumericF = (
	operand: number | NumericOperation,
) => Either<string[], Option<number>>

const liftNumeric: LiftNumericF = operand =>
	typeof operand === "number"
		? right(some(operand))
		: evaluateNumericOperation(operand)()

export default liftNumeric
