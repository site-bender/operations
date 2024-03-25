import type { Either, Left, Right } from "fp-ts/lib/Either"
import { isLeft, right } from "fp-ts/lib/Either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

type Or = (o: OrOperation) => () => Either<Array<string>, boolean>
const or: Or = (op) => {
	const operands = getOperands(op.operands)("unknown") as (
		| Left<string[]>
		| Right<unknown>
	)[]

	const errors = operands.filter((r) => isLeft(r))

	return errors.length === operands.length
		? () => collectErrors(operands)
		: () => right(true)
}

export default or
