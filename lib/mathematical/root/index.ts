import { pipe } from "fp-ts/lib/function"
import { traverseArray, match } from "fp-ts/lib/Either"

import { some } from "../../fp/option"
import { left, right } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"
import truncate from "../../utilities/truncate"

type RootF = (
	operation: RootOperation,
) => () => Either<Array<string>, Option<number>>

const root: RootF = operation => {
	return pipe(
		[operation.radicand, operation.index],
		traverseArray(liftNumeric),
		match(
			errors => () => left(errors),
			([radicand, index]: Array<Some<number>>) =>
				() => {
					const value = Math.pow(
						(radicand as Some<number>).value,
						1 / (index as Some<number>).value,
					)

					const val = operation.truncation ? truncate(operation)(value) : value

					return right(some(val))
				},
		),
	)
}

export default root
