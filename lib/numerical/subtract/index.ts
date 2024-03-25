import type { Either, Left, Right } from "fp-ts/lib/Either"
import { isLeft, right } from "fp-ts/lib/Either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

type Subtract = (o: SubtractOperation) => () => Either<Array<string>, number>
const subtract: Subtract = (op) => {
	const [minuend, subtrahend] = getOperands([op.minuend, op.subtrahend])(
		"number",
	) as (Left<string[]> | Right<number>)[]

	const errors = collectErrors([minuend, subtrahend])

	return isLeft(errors as Left<Array<string>>)
		? () => errors
		: () =>
				right(
					(minuend as Right<number>).right -
						(subtrahend as Right<number>).right,
				)
}

export default subtract
