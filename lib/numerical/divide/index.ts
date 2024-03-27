import type { Either, Left, Right } from "fp-ts/lib/Either"
import { isLeft, left, right } from "fp-ts/lib/Either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

type Divide = (o: DivideOperation) => () => Either<Array<string>, number>
const divide: Divide = op => {
	const [dividend, divisor] = getOperands([op.dividend, op.divisor])(
		"number",
	) as (Left<string[]> | Right<number>)[]

	const errors = collectErrors([dividend, divisor])

	return isLeft(errors as Left<Array<string>>)
		? () => errors
		: (divisor as Right<number>).right === 0
			? () => left(["Cannot divide by 0."])
			: () =>
					right(
						(dividend as Right<number>).right /
							(divisor as Right<number>).right,
					)
}

export default divide
