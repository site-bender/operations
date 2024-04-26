import type {
	CastableValue,
	InjectableOperation,
	Reify,
} from "../../../../types"

import { left } from "@sitebender/fp/lib/either"
import { Option } from "@sitebender/fp/lib/option"
import injectFromFormInput from "../../../../makeInjector/injectors/injectFromFormInput"
import { OperationResult } from "../../operationResult/types"

export type EvaluateInjectableOperation = (
	op: InjectableOperation,
) => (
	input?: Option<Reify<CastableValue>>,
) => OperationResult<Reify<CastableValue>>

const evaluateInjectableOperation: EvaluateInjectableOperation = op => {
	switch (op.operation) {
		case "formInput":
			return injectFromFormInput(op)()
		default:
			return () => left([`Invalid unit operation ${op}`])
	}
}

export default evaluateInjectableOperation
