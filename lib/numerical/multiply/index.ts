import type { Either, Left, Right } from "fp-ts/lib/Either"
import { isLeft, right } from "fp-ts/lib/Either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

import { MULTIPLICATION_IDENTITY } from "../../constants"

type Multiply = (o: MultiplyOperation) => () => Either<Array<string>, number>
const multiply: Multiply = (op) => {
	const multipliers = getOperands(op.multipliers)("number") as (
		| Left<string[]>
		| Right<number>
	)[]

	const errors = collectErrors(multipliers)

	return isLeft(errors as Left<Array<string>>)
		? () => errors
		: () =>
				multipliers.reduce(
					(sum, operand) =>
						right(
							(operand as Right<number>).right * (sum as Right<number>).right,
						),
					right(MULTIPLICATION_IDENTITY),
				)
}

export default multiply
