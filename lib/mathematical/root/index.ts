import { pipe } from "fp-ts/lib/function"
import { traverseArray, match } from "fp-ts/lib/Either"

import { some } from "../../fp/option"
import { left, right } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"

type RootF = (
	operation: RootOperation,
) => () => Either<Array<string>, Option<number>>

const root: RootF = op => {
	return pipe(
		[op.radicand, op.index],
		traverseArray(liftNumeric),
		match(
			errors => () => left(errors),
			([radicand, index]: Array<Some<number>>) =>
				() =>
					right(
						some(
							Math.pow(
								(radicand as Some<number>).value,
								1 / (index as Some<number>).value,
							),
						),
					),
		),
	)
}

export default root
