import type { CastableValue, InjectFromForm, Reify } from "../../../types"

import { Option, none } from "@sitebender/fp/lib/option"
import castValue from "../../../old/utilities/castValue"
import getValue from "../../../old/utilities/getValue"
import { pipe } from "@sitebender/fp/lib/functions"
import { OperationResult } from "../../../old/operations/operationResult/types"
import { mapEither } from "../../../old/operations/operationResult"
import { Lazy } from "@sitebender/fp/lib/lazy"

export type FromFormInput = <T extends CastableValue>(
	op: InjectFromForm<T>,
) => (input?: Option<Reify<T>>) => Lazy<OperationResult<Reify<T>>>

const injectFromFormInput: FromFormInput =
	op =>
	(_ = none) => {
		if (op.eager) {
			const item = pipe(
				getValue(op.field)(),
				mapEither(castValue(op.operation)),
			)
			return () => item
		}

		return () => pipe(getValue(op.field)(), mapEither(castValue(op.operation)))
	}

export default injectFromFormInput
