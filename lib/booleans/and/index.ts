import type { Either } from "fp-ts/lib/Either"
import { left, right, traverseArray, match } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"
import { IO } from "fp-ts/lib/IO"

import composeOperations from "../../operations/compose"

type And = (op: AndOperation) => IO<Either<Array<string>, boolean>>
const and: And = op => {
	return pipe(
		op.operands,
		traverseArray(_ => composeOperations(_)()), // nice, but only returns first error: is that what we want?
		match(
			errors => () => left(errors),
			_ => () => right(true),
		),
	)
}

export default and
