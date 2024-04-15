import type {
	CastableValues,
	LiteralLookupOperation,
	Reify,
} from "../../../types"

import { Either, left } from "@sitebender/fp/lib/either"
import lookup from "../../../lookup/literal"

export type EvaluateLookupOperation = (
	OperationMultiply: LiteralLookupOperation,
) => (key: string) => Either<Array<string>, Reify<CastableValues>>

const evaluateLookupOperation: EvaluateLookupOperation = op => {
	switch (op.operation) {
		case "literal-lookup":
			return lookup(op)
		default:
			return () => left([`Invalid numeric operation: ${op.operation}.`])
	}
}

export default evaluateLookupOperation
