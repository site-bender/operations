import {
	SbInjectorType,
	type SbCastableValue,
	type SbInjectFromMap,
	type Reify,
} from "../../../../types"

import { Option } from "@sitebender/fp/lib/option"
import { Either, left } from "@sitebender/fp/lib/either"
import lookup from "../../../../makeInjector/injectors/injectFromMap"

export type EvaluateLookupOperation = (
	op: SbInjectFromMap<SbCastableValue>,
) => (
	input: Option<Reify<SbCastableValue>>,
) => Either<Array<string>, Option<Reify<SbCastableValue>>>

const evaluateLookupOperation: EvaluateLookupOperation = op => input => {
	switch (op.type) {
		case SbInjectorType.map:
			return lookup(op)(input)
		default:
			return left([`Invalid numeric operation: ${op.injectedDataType}.`])
	}
}

export default evaluateLookupOperation
