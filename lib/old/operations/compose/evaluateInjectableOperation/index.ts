import {
	SbInjectorSource,
	type SbCastableValue,
	type SbInjectableOperation,
	type Reify,
} from "../../../../types"

import { left, right } from "@sitebender/fp/lib/either"
import { Option, some } from "@sitebender/fp/lib/option"
import injectFromFormInput from "../../../../makeInjector/injectors/injectFromFormInput"
import { OperationResult } from "../../operationResult/types"
import injectFromMap from "../../../../makeInjector/injectors/injectFromMap"

export type EvaluateInjectableOperation = (
	op: SbInjectableOperation,
) => (
	input: Option<Reify<SbCastableValue>>,
) => OperationResult<Reify<SbCastableValue>>

const evaluateInjectableOperation: EvaluateInjectableOperation = op => {
	switch (op.source) {
		case SbInjectorSource.constant:
			return () => right(some(op.value))
		case SbInjectorSource.form:
			return injectFromFormInput(op)()
		case SbInjectorSource.map:
			return injectFromMap(op)
		case SbInjectorSource.argument:
			return (input: Option<Reify<SbCastableValue>>) => right(input)
		default:
			return () => left([`Invalid injectable operation ${op.source}`])
	}
}

export default evaluateInjectableOperation
