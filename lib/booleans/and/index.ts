import type { Either } from "fp-ts/lib/Either"
import { left, right, traverseArray, match } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"

import { composeOperations } from "../../operations/compose"

type And = (op: AndOperation) => () => Either<Array<string>, boolean>
const and: And = op => {
	return pipe(
		op.operands,
		traverseArray(_ => composeOperations(_)()),
		match(
			errs => () => left(errs),
			_ => () => right(true),
		),
	)
}

export default and
