import { pipe } from "fp-ts/lib/function"
import { traverseArray, match } from "fp-ts/lib/Either"

import { isNone, none, some } from "../../fp/option"
import { left, right } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"
import reduce from "../../array/reduce"

import { MULTIPLICATION_IDENTITY } from "../../constants"

type MultiplyF = (
	op: MultiplyOperation,
) => () => Either<Array<string>, Option<number>>

const multiply: MultiplyF = op => {
	return pipe(
		op.multipliers,
		traverseArray(liftNumeric),
		match(
			errors => () => left(errors),
			nums => () =>
				right(
					reduce((sum: Option<number>, n: Option<number>) =>
						isNone(sum) || isNone(n)
							? none
							: some((sum as Some<number>).value * (n as Some<number>).value),
					)(some(MULTIPLICATION_IDENTITY))(nums as Array<Option<number>>),
				),
		),
	)
}

export default multiply
