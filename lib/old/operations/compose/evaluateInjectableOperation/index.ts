import {
	SbInjectorType,
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
	switch (op.type) {
		case SbInjectorType.constant:
			return () => right(some(op.value))
		case SbInjectorType.form:
			return injectFromFormInput(op)()
		case SbInjectorType.map:
			return injectFromMap(op)
		case SbInjectorType.argument:
			return (input: Option<Reify<SbCastableValue>>) => right(input)
		default:
			return () => left([`Invalid injectable operation ${op.type}`])
	}
}

export default evaluateInjectableOperation
