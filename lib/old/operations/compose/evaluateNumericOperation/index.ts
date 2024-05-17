import type { SbNumericOperation } from "../../../../types"

import { Either, left } from "@sitebender/fp/lib/either"
import { Option } from "@sitebender/fp/lib/option"
import add from "../../../../makeCalculator/operations/add"
import divide from "../../../../makeCalculator/operations/divide"
import multiply from "../../../../makeCalculator/operations/multiply"
import negate from "../../../../makeCalculator/operations/negate"
import power from "../../../../makeCalculator/operations/power"
import root from "../../../../makeCalculator/operations/root"
import subtract from "../../../../makeCalculator/operations/subtract"
import ceiling from "../../../../makeCalculator/operations/ceiling"
import floor from "../../../../makeCalculator/operations/floor"
import round from "../../../../makeCalculator/operations/round"
import truncate from "../../../../makeCalculator/operations/truncate"

export type EvaluateNumericOperation = (
	op: SbNumericOperation,
) => (input?: Option<number>) => Either<Array<string>, Option<number>>

const evaluateNumericOperation: EvaluateNumericOperation = op => {
	const error = (op: never) => () =>
		left([`Invalid numeric operation: ${op["operation"] ?? "unknown"}.`])

	switch (op.operation) {
		case "add":
			return add(op)
		case "ceiling":
			return ceiling(op)
		case "divide":
			return divide(op)
		case "floor":
			return floor(op)
		case "multiply":
			return multiply(op)
		case "negate":
			return negate(op)
		case "power":
			return power(op)
		case "root":
			return root(op)
		case "round":
			return round(op)
		case "subtract":
			return subtract(op)
		case "truncate":
			return truncate(op)
		default:
			return error(op)
	}
}

export default evaluateNumericOperation
