import type { BooleanOperation } from "../../../types"

import { Either, left } from "@sitebender/fp/lib/either"
import and from "../../../booleans/and"
import or from "../../../booleans/or"

export type EvaluateBooleanOperations = (
	o: BooleanOperation,
) => () => Either<Array<string>, boolean>

const evaluateBooleanOperation: EvaluateBooleanOperations = op => {
	switch (op.operation) {
		case "and":
			return and(op)
		case "or":
			return or(op)
		default:
			return () => left([`Invalid boolean operation ${op}`])
	}
}

export default evaluateBooleanOperation
