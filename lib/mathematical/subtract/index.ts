import { isLeft, right } from "../../fp/either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

type Subtract = (o: SubtractOperation) => () => Either<Array<string>, number>
const subtract: Subtract = op => {
	const [minuend, subtrahend] = getOperands([op.minuend, op.subtrahend])(
		"number",
	) as (Left<string[]> | Right<number>)[]

	const error = collectErrors([minuend, subtrahend]) as Left<Array<string>>

	return isLeft(error)
		? () => error
		: () =>
				right(
					(minuend as Right<number>).right -
						(subtrahend as Right<number>).right,
				)
}

export default subtract
