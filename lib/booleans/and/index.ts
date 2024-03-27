import type { Either, Left, Right } from "fp-ts/lib/Either"
import { isLeft, right } from "fp-ts/lib/Either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

type And = (o: AndOperation) => () => Either<Array<string>, boolean>
const and: And = op => {
	const operands = getOperands(op.operands)("number") as (
		| Left<string[]>
		| Right<number>
	)[]

	const errors = collectErrors(operands)

	return isLeft(errors as Left<Array<string>>)
		? () => errors
		: () => right(true)
}

export default and
