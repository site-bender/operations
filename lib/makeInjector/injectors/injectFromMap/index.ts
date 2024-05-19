import type { OperationResult } from "../../../operations/operationResult/types"
import type { Option } from "@sitebender/fp/lib/option/types"
import type { SbCastableValue, SbInjectFromMap, Reify } from "../../../types"

import * as OpResult from "../../../operations/operationResult"
import flatMap from "@sitebender/fp/lib/option/flatMap"
import fromNullable from "@sitebender/fp/lib/option/fromNullable"
import liftInjectable from "../../../old/operations/liftInjectable"
import none from "@sitebender/fp/lib/option/none"
import pipe from "@sitebender/fp/lib/functions/pipe"

type InjectFromMapF = <T extends SbCastableValue>(
	op: SbInjectFromMap<T>,
) => (input?: Option<Reify<T>>) => OperationResult<Reify<T>>

const injectFromMap: InjectFromMapF =
	op =>
	(input = none) => {
		return pipe(
			liftInjectable(input)(op.operand),
			OpResult.flatMap(key =>
				OpResult.fromOption(
					pipe(
						fromNullable(op.test[String(key)]),
						flatMap(row => fromNullable(row[op.column - 1])),
					),
				),
			),
		)
	}

export default injectFromMap
