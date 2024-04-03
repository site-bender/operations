import { some, getOrElse } from "../../fp/option"
import { allOf, left, match as matchEither, right } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"
import pipe from "../../fp/functions/pipe"

type Divide = (
	operation: DivideOperation,
) => () => Either<Array<string>, Option<number>>

const divide: Divide = op => {
	return pipe(
		allOf(liftNumeric)([op.dividend, op.divisor]),
		pipe(
			([maybeDividend, maybeDivisor]: Option<number>[]) =>
				() => {
					const dividend = getOrElse(() => 0)(maybeDividend)
					const divisor = getOrElse(() => 1)(maybeDivisor)
					const quotient = dividend / divisor

					return Number.isNaN(quotient) || quotient === Infinity
						? left(["Invalid numeric operation: divide."])
						: right(some(quotient))
				},
			matchEither(errors => () => left(errors)),
		),
	)
}

export default divide
