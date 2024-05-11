import type { AlgebraicOperation } from "../../../../types"

import { Either, left } from "@sitebender/fp/lib/either"
import and from "../../../../makeConditional/operators/algebraic/and"
import or from "../../../../makeConditional/operators/algebraic/or"

export type EvaluateBooleanOperations = (
	o: AlgebraicOperation,
) => () => Either<Array<string>, boolean>

const evaluateBooleanOperation: EvaluateBooleanOperations = op => {
	switch (op.operation) {
		case "and":
			return and(op)
		case "or":
			return or(op)
		default:
			return () =>
				left([`Invalid boolean operation: ${op["operation"] ?? "unknown"}.`])
	}
}

export default evaluateBooleanOperation
