import type { Either, Left, Right } from "fp-ts/lib/Either"
import { isLeft, right } from "fp-ts/lib/Either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

type Negate = (o: NegateOperation) => () => Either<Array<string>, number>
const negate: Negate = op => {
	const [operand] = getOperands([op.operand])("number") as (
		| Left<string[]>
		| Right<number>
	)[]

	const error = collectErrors([operand]) as Left<Array<string>>

	return isLeft(error)
		? () => error
		: () => right(-(operand as Right<number>).right)
}

export default negate
