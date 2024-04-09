import { IO } from "fp-ts/lib/IO"

import composeOperations from "../../operations/compose"
import { allOf, match, right, left } from "../../fp/either"
import pipe from "../../fp/functions/pipe"

type And = (op: AndOperation) => IO<Either<Array<string>, boolean>>
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
