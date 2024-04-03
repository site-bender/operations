import { some, getOrElse } from "../../fp/option"
import { left, match as matchEither, right } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"
import traverseAccumulate from "../../fp/either/traverseAccumulate"
import pipe from "../../fp/functions/pipe"

type Divide = (
	operation: DivideOperation,
) => () => Either<Array<string>, Option<number>>

const divide: Divide = op => {
	return pipe(
		[op.dividend, op.divisor],
		pipe(
			liftNumeric,
			traverseAccumulate((a, b) => [...a, ...b]),
		),
		pipe(
			([maybeDividend, maybeDivisor]: Option<number>[]) =>
				() => {
					const dividend = pipe(
						maybeDividend,
						getOrElse(() => 0),
					)

					const divisor = pipe(
						maybeDivisor,
						getOrElse(() => 1),
					)
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
