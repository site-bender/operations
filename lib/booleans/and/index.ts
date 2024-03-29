import { isLeft, right } from "../../fp/either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

type And = (o: AndOperation) => () => Either<Array<string>, boolean>
const and: And = op => {
	const operands = getOperands(op.operands)("number") as (
		| Left<string[]>
		| Right<number>
	)[]

	const errors = collectErrors(operands) as Left<Array<string>>

	return isLeft(errors) ? () => errors : () => right(true)
}

export default and
