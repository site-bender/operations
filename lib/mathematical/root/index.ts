import { sequence, map } from "../../fp/option"
import { match, left, right, allOf } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"
import truncate from "../../utilities/truncate"
import { pipe } from "../../fp/functions"

type RootF = (
	operation: RootOperation,
) => () => Either<Array<string>, Option<number>>

const root: RootF = operation => {
	const doTruncation = (n: number) =>
		operation.truncation ? truncate(operation)(n) : n

	return pipe(
		allOf(liftNumeric)([operation.radicand, operation.index]),
		pipe(
			([radicand, index]: Array<Option<number>>) =>
				() =>
					pipe(
						[radicand, index],
						sequence,
						map(([radicand, index]) => Math.pow(radicand, 1 / index)),
						map(doTruncation),
						right,
					),
			match(errors => () => left(errors)),
		),
	)
}

export default root
