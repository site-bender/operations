import { isLeft, right } from "../../fp/either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

type Power = (o: PowerOperation) => () => Either<Array<string>, number>
const power: Power = op => {
	const [base, exponent] = getOperands([op.base, op.exponent])("number") as (
		| Left<string[]>
		| Right<number>
	)[]

	const error = collectErrors([base, exponent]) as Left<Array<string>>

	return isLeft(error)
		? () => error
		: () =>
				right(
					Math.pow(
						(base as Right<number>).right,
						(exponent as Right<number>).right,
					),
				)
}

export default power
