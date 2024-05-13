import { Option, fromNullable, none } from "@sitebender/fp/lib/option"
import { pipe } from "@sitebender/fp/lib/functions"
import { SbCastableValue, SbInjectFromMap, Reify } from "../../../types"
import { OperationResult } from "../../../old/operations/operationResult/types"
import * as OpResult from "../../../old/operations/operationResult"
import liftInjectable from "../../../old/operations/liftInjectable"

type InjectFromMapF = <T extends SbCastableValue>(
	op: SbInjectFromMap<T>,
) => (input?: Option<Reify<T>>) => OperationResult<Reify<T>>

const injectFromMap: InjectFromMapF =
	op =>
	(input = none) => {
		return pipe(
			liftInjectable(input)(op.operand),
			OpResult.flatMap(key =>
				OpResult.fromOption(fromNullable(op.test[String(key)])),
			),
		)
	}

export default injectFromMap
