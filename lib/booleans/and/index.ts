import type { AndOperation } from "../../types"

import { Either, allOf, match, right, left } from "@sitebender/fp/lib/either"
import { Lazy } from "@sitebender/fp/lib/lazy"
import composeOperations from "../../operations/compose"
import pipe from "@sitebender/fp/lib/functions/pipe"

export type And = (op: AndOperation) => Lazy<Either<Array<string>, boolean>>

const and: And = op => {
	return pipe(
		pipe(
			op.operands,
			allOf(a => composeOperations(a)()),
		),
		pipe(
			() => () => right(true),
			match(errors => () => left(errors)),
		),
	)
}

export default and
