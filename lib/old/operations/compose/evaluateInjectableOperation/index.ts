import {
	InjectorSource,
	type CastableValue,
	type InjectableOperation,
	type Reify,
} from "../../../../types"

import { left, right } from "@sitebender/fp/lib/either"
import { Option, some } from "@sitebender/fp/lib/option"
import injectFromFormInput from "../../../../makeInjector/injectors/injectFromFormInput"
import { OperationResult } from "../../operationResult/types"
import injectFromMap from "../../../../makeInjector/injectors/injectFromMap"

export type EvaluateInjectableOperation = (
	op: InjectableOperation,
) => (
	input: Option<Reify<CastableValue>>,
) => OperationResult<Reify<CastableValue>>

const evaluateInjectableOperation: EvaluateInjectableOperation = op => {
	switch (op.source) {
		case InjectorSource.constant:
			return () => right(some(op.value))
		case InjectorSource.form:
			return injectFromFormInput(op)()
		case InjectorSource.map:
			return injectFromMap(op)
		case InjectorSource.argument:
			return (input: Option<Reify<CastableValue>>) => right(input)
		default:
			return () => left([`Invalid injectable operation ${op.source}`])
	}
}

export default evaluateInjectableOperation
