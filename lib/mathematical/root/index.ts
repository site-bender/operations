import { pipe } from "fp-ts/lib/function"

import { sequence, map } from "../../fp/option"
import { match, left, right, traverseAccumulate } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"
import truncate from "../../utilities/truncate"
import uncurry from "../../utilities/uncurry"
import { default as concatArray } from "../../array/concat"

type RootF = (
	operation: RootOperation,
) => () => Either<Array<string>, Option<number>>

const root: RootF = operation => {
	const doTruncation = (n: number) =>
		operation.truncation ? truncate(operation)(n) : n

	const concat = uncurry(concatArray<string>)

	return pipe(
		[operation.radicand, operation.index],
		pipe(liftNumeric, traverseAccumulate(concat)),
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
