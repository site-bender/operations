import {
	SbInjectorType,
	type SbCastableValue,
	type Reify,
	SbInjectableOperationOfType,
} from "../../../../types"

import { left, right } from "@sitebender/fp/lib/either"
import { Option, some } from "@sitebender/fp/lib/option"
import injectFromFormInput from "../../../../makeInjector/injectors/injectFromFormInput"
import { OperationResult } from "../../operationResult/types"
import injectFromMap from "../../../../makeInjector/injectors/injectFromMap"

export type EvaluateInjectableOperationOfType = <T extends SbCastableValue>(
	op: SbInjectableOperationOfType<T>,
) => (input: Option<Reify<T>>) => OperationResult<Reify<T>>

const evaluateInjectableOperationOfType: EvaluateInjectableOperationOfType =
	op => {
		switch (op.type) {
			case SbInjectorType.constant:
				return () => right(some(op.value))
			case SbInjectorType.form:
				return injectFromFormInput(op)()
			case SbInjectorType.map:
				return injectFromMap(op)
			case SbInjectorType.argument:
				return input => right(input)
			default:
				return () => left([`Invalid injectable operation ${op.type}`])
		}
	}

export default evaluateInjectableOperationOfType
