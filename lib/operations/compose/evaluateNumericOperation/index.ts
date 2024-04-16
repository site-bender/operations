import type { NumericOperation } from "../../../types"

import { Either, left } from "@sitebender/fp/lib/either"
import { Option } from "@sitebender/fp/lib/option"
import add from "../../../mathematical/add"
import divide from "../../../mathematical/divide"
import multiply from "../../../mathematical/multiply"
import negate from "../../../mathematical/negate"
import power from "../../../mathematical/power"
import root from "../../../mathematical/root"
import subtract from "../../../mathematical/subtract"

export type EvaluateNumericOperation = (
	OperationMultiply: NumericOperation,
) => () => Either<Array<string>, Option<number>>

const evaluateNumericOperation: EvaluateNumericOperation = op => {
	const error = (op: never) => () =>
		left([`Invalid numeric operation: ${op["operation"] ?? "unknown"}.`])

	// TODO handle comparison operatons - lessThan etc
	switch (op.operation) {
		case "add":
			return add(op)
		case "divide":
			return divide(op)
		case "multiply":
			return multiply(op)
		case "negate":
			return negate(op)
		case "power":
			return power(op)
		case "root":
			return root(op)
		case "subtract":
			return subtract(op)
		default:
			return error(op)
	}
}

export default evaluateNumericOperation
