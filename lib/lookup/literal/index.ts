import { Option, fromNullable, none } from "@sitebender/fp/lib/option"
import { pipe } from "@sitebender/fp/lib/functions"
import { CastableValue, LiteralLookupOperation, Reify } from "../../types"
import { OperationResult } from "../../operations/operationResult/types"
import * as OpResult from "../../operations/operationResult"
import liftInjectable from "../../operations/liftInjectable"

type LookupF = (
	op: LiteralLookupOperation,
) => (
	input?: Option<Reify<CastableValue>>,
) => OperationResult<Reify<CastableValue>>

const lookup: LookupF =
	op =>
	(input = none) => {
		return pipe(
			liftInjectable(input)(op.operand),
			OpResult.flatMap(key =>
				OpResult.fromOption(fromNullable(op.test[String(key)])),
			),
		)
	}

export default lookup
