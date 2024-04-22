import type { CastableValue, FormInputOperation, Reify } from "../../types"

import { flatMap, right, left, map } from "@sitebender/fp/lib/either"
import { Option, none, some } from "@sitebender/fp/lib/option"
import { match } from "@sitebender/fp/lib/option"
import castValue from "../../utilities/castValue"
import getValue from "../../utilities/getValue"
import { pipe } from "@sitebender/fp/lib/functions"
import { OperationResult } from "../../operations/operationResult/types"
import { Lazy } from "@sitebender/fp/lib/lazy"

export type FromFormInput = (
	op: FormInputOperation,
) => (
	input?: Option<Reify<CastableValue>>,
) => Lazy<OperationResult<Reify<CastableValue>>>

const fromFormInput: FromFormInput =
	op =>
	(_ = none) => {
		//TODO move to fp lib.
		const toEither = pipe(
			right,
			match(() => left([`No value found`])),
		)

		if (op.eager) {
			const item = pipe(
				getValue(op.name)(),
				flatMap(toEither),
				castValue(op.returns),
				map(some),
			)
			return () => item
		}

		return () =>
			pipe(
				getValue(op.name)(),
				flatMap(toEither),
				castValue(op.returns),
				map(some),
			)
	}

export default fromFormInput
