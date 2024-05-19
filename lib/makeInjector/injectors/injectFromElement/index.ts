import type {
	SbCastableValue,
	SbInjectFromElement,
	Reify,
} from "../../../types"

import { Option, none } from "@sitebender/fp/lib/option"
import castValue from "../../../utilities/castValue"
import getValue from "../../../old/utilities/getValue"
import { pipe } from "@sitebender/fp/lib/functions"
import type { OperationResult } from "../../../operations/operationResult/types"
import { mapEither } from "../../../operations/operationResult"
import { Lazy } from "@sitebender/fp/lib/lazy"

export type FromElementF = <T extends SbCastableValue>(
	op: SbInjectFromElement<T>,
) => (input?: Option<Reify<T>>) => Lazy<OperationResult<Reify<T>>>

const injectFromElement: FromElementF =
	op =>
	(_ = none) => {
		if (op.eager) {
			const item = pipe(
				getValue(op.source)(),
				mapEither(castValue(op.injectedDataType)),
			)
			return () => item
		}

		return () =>
			pipe(getValue(op.source)(), mapEither(castValue(op.injectedDataType)))
	}

export default injectFromElement
