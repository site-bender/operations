import type { CastableValue, LookupOperation, Reify } from "../../../types"

import { Either, left } from "@sitebender/fp/lib/either"
import lookup from "../../../lookup/literal"

export type EvaluateLookupOperation = (
	OperationMultiply: LookupOperation,
) => () => Either<Array<string>, Reify<CastableValue>>

const evaluateLookupOperation: EvaluateLookupOperation = op => {
	switch (op.operation) {
		case "literalLookup":
			return lookup(op)
		default:
			return () => left([`Invalid numeric operation: ${op.operation}.`])
	}
}

export default evaluateLookupOperation
