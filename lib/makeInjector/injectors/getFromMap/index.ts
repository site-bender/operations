import { Option, fromNullable, none } from "@sitebender/fp/lib/option"
import { pipe } from "@sitebender/fp/lib/functions"
import { CastableValue, GetFromMapOperation, Reify } from "../../../types"
import { OperationResult } from "../../../old/operations/operationResult/types"
import * as OpResult from "../../../old/operations/operationResult"
import liftInjectable from "../../../old/operations/liftInjectable"

type GetFromMapF = (
	op: GetFromMapOperation,
) => (
	input?: Option<Reify<CastableValue>>,
) => OperationResult<Reify<CastableValue>>

const getFromMap: GetFromMapF =
	op =>
	(input = none) => {
		return pipe(
			liftInjectable(input)(op.operand),
			OpResult.flatMap(key =>
				OpResult.fromOption(fromNullable(op.test[String(key)])),
			),
		)
	}

export default getFromMap
