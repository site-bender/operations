import type { CastableValues, LookupOperation, Reify } from "../../../types"

import { Either, left } from "@sitebender/fp/lib/either"
import lookup from "../../../lookup/literal"

export type EvaluateLookupOperation = (
	OperationMultiply: LookupOperation,
) => () => Either<Array<string>, Reify<CastableValues>>

const evaluateLookupOperation: EvaluateLookupOperation = op => {
	switch (op.operation) {
		case "literalLookup":
			return lookup(op)
		default:
			return () => left([`Invalid numeric operation: ${op.operation}.`])
	}
}

export default evaluateLookupOperation
