import {
	SbInjectorType,
	type SbCastableValue,
	type SbInjectFromMap,
	type Reify,
} from "../../../../types"

import { Option } from "@sitebender/fp/lib/option"
import { Either, left } from "@sitebender/fp/lib/either"
import injectFromMap from "../../../../makeInjector/injectors/injectFromMap"

export type EvaluateLookupOperation = <T extends SbCastableValue>(
	op: SbInjectFromMap<T>, //| SbInjectFromLookupTable<T>,
) => (input: Option<Reify<T>>) => Either<Array<string>, Option<Reify<T>>>

const evaluateLookupOperation: EvaluateLookupOperation = op => input => {
	const error = (_: never) => left([`Invalid numeric operation: ${op.type}.`])

	switch (op.type) {
		case SbInjectorType.map:
			return injectFromMap(op)(input)
		//case SbInjectorType.table:
		//	return injectFromLookupTable(op)(input)
		default:
			return error(op.type)
	}
}

export default evaluateLookupOperation
