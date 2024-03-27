import type { Either, Left, Right } from "fp-ts/lib/Either"
import { isLeft, right } from "fp-ts/lib/Either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

type Power = (o: PowerOperation) => () => Either<Array<string>, number>
const power: Power = op => {
	const [base, exponent] = getOperands([op.base, op.exponent])("number") as (
		| Left<string[]>
		| Right<number>
	)[]

	const errors = collectErrors([base, exponent])

	return isLeft(errors as Left<Array<string>>)
		? () => errors
		: () =>
				right(
					Math.pow(
						(base as Right<number>).right,
						(exponent as Right<number>).right,
					),
				)
}

export default power
