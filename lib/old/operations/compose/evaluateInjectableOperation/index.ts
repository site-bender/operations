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

export type EvaluateInjectableOperation = (
	op: InjectableOperation,
) => (
	input?: Option<Reify<CastableValue>>,
) => OperationResult<Reify<CastableValue>>

const evaluateInjectableOperation: EvaluateInjectableOperation = op => {
	switch (op.source) {
		case InjectorSource.constant:
			return () => right(some(op.value))
		case InjectorSource.form:
			return injectFromFormInput(op)()
		default:
			return () => left([`Invalid unit operation ${op}`])
	}
}

export default evaluateInjectableOperation
