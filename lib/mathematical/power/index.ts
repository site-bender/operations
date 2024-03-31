import { pipe } from "fp-ts/lib/function"
import { traverseArray, match } from "fp-ts/lib/Either"

import { some } from "../../fp/option"
import { left, right } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"

type PowerF = (
	operation: PowerOperation,
) => () => Either<Array<string>, Option<number>>

const power: PowerF = op => {
	return pipe(
		[op.base, op.exponent],
		traverseArray(liftNumeric),
		match(
			errors => () => left(errors),
			([base, exponent]: Array<Some<number>>) =>
				() =>
					right(
						some(
							Math.pow(
								(base as Some<number>).value,
								(exponent as Some<number>).value,
							),
						),
					),
		),
	)
}

export default power
