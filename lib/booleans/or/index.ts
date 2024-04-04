import { map, some } from "../../array"
import { isRight, right } from "../../fp/either"
import pipe from "../../fp/functions/pipe"
import composeOperations from "../../operations/compose"

type Or = (op: OrOperation) => () => Either<Array<string>, boolean>

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
