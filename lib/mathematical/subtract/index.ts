import { some, map, sequence, getOrElse, none } from "../../fp/option"
import { match, left, right, traverseAccumulate } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"
import pipe from "../../fp/functions/pipe"
import uncurry from "../../utilities/uncurry"
import concat from "../../array/concat"

type SubtractF = (
	o: SubtractOperation,
) => () => Either<Array<string>, Option<number>>

const divide: SubtractF = op => {
	return pipe(
		[op.minuend, op.subtrahend],
		pipe(liftNumeric, traverseAccumulate(uncurry(concat<string>))),
		pipe(
			([minuend, subtrahend]: Array<Option<number>>) =>
				() =>
					pipe(
						[minuend, subtrahend],
						sequence,
						map(([minuend, subtrahend]) => {
							const difference = minuend - subtrahend

							return Number.isNaN(difference)
								? left(["Invalid numeric operation: divide."])
								: right(some(difference))
						}),
						getOrElse((): Either<Array<string>, Option<number>> => right(none)),
					),
			match(errors => () => left(errors)),
		),
	)
}

export default divide
