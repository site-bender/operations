import { pipe } from "fp-ts/lib/function"
import { traverseArray, match } from "fp-ts/lib/Either"

import { some } from "../../fp/option"
import { left, right } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"

type SubtractF = (
	o: SubtractOperation,
) => () => Either<Array<string>, Option<number>>

const divide: SubtractF = op => {
	return pipe(
		[op.minuend, op.subtrahend],
		traverseArray(liftNumeric),
		match(
			errors => () => left(errors),
			([minuend, subtrahend]: Array<Some<number>>) =>
				() => {
					const difference =
						(minuend as Some<number>).value - (subtrahend as Some<number>).value

					return Number.isNaN(difference)
						? left(["Invalid numeric operation: divide."])
						: right(some(difference))
				},
		),
	)
}

export default divide
