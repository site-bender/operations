import { pipe } from "fp-ts/lib/function"
import { traverseArray, match } from "fp-ts/lib/Either"

import { some } from "../../fp/option"
import { left, right } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"

type Divide = (
	operation: DivideOperation,
) => () => Either<Array<string>, Option<number>>

const divide: Divide = op => {
	return pipe(
		[op.dividend, op.divisor],
		traverseArray(liftNumeric),
		match(
			errors => () => left(errors),
			([dividend, divisor]: Array<Some<number>>) =>
				() => {
					const quotient =
						(dividend as Some<number>).value / (divisor as Some<number>).value

					return Number.isNaN(quotient) || quotient === Infinity
						? left(["Invalid numeric operation: divide."])
						: right(some(quotient))
				},
		),
	)
}

export default divide
