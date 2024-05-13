import type { SbOrOperation } from "../../../../types"

import { Either, isRight, right } from "@sitebender/fp/lib/either"
import { map, some } from "@sitebender/fp/lib/array"
import composeOperations from "../../../../old/operations/compose"
import pipe from "@sitebender/fp/lib/functions/pipe"

export type Or = (op: SbOrOperation) => () => Either<Array<string>, boolean>

const or: Or = op => {
	return pipe(
		pipe(
			op.operands,
			map(_ => composeOperations(_)()),
		),
		some(isRight),
		right<boolean, Array<string>>,
		r => () => r,
	)
}

export default or
