import type { CastableValues, FormInputOperation, Reify } from "../../types"

import { Either, flatMap, right, left } from "@sitebender/fp/lib/either"
import { match } from "@sitebender/fp/lib/option"
import castValue from "../../utilities/castValue"
import getValue from "../../utilities/getValue"
import { pipe } from "@sitebender/fp/lib/functions"

export type FromFormInput = (
	op: FormInputOperation,
) => () => Either<Array<string>, Reify<CastableValues>>

const fromFormInput: FromFormInput = op => {
	//TODO move to fp lib.
	const toEither = pipe(
		right,
		match(() => left([`No value found`])),
	)

	//TODO getValue returns an either wrapped Option, should a None just be a left failure?

	if (op.eager) {
		const item = pipe(
			getValue(op.name)(),
			flatMap(toEither),
			castValue(op.returns),
		)
		return () => item
	}

	return () =>
		pipe(getValue(op.name)(), flatMap(toEither), castValue(op.returns))
}

export default fromFormInput
