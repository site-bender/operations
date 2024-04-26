import type { CastableValue, LookupOperation, Reify } from "../../../../types"

import { Option } from "@sitebender/fp/lib/option"
import { Either, left } from "@sitebender/fp/lib/either"
import lookup from "../../../../makeInjector/injectors/injectFromMap"

export type EvaluateLookupOperation = (
	OperationMultiply: LookupOperation,
) => (
	input: Option<Reify<CastableValue>>,
) => Either<Array<string>, Option<Reify<CastableValue>>>

const evaluateLookupOperation: EvaluateLookupOperation = op => input => {
	switch (op.operation) {
		case "injectFromMap":
			return lookup(op)(input)
		default:
			return left([`Invalid numeric operation: ${op.operation}.`])
	}
}

export default evaluateLookupOperation
