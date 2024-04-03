import { map as mapOption, sequence } from "../../fp/option"
import { left, right, match, traverseAccumulate } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"
import reduce from "../../array/reduce"

import { MULTIPLICATION_IDENTITY } from "../../constants"
import pipe from "../../fp/functions/pipe"

type MultiplyF = (
	op: MultiplyOperation,
) => () => Either<Array<string>, Option<number>>

const multiply: MultiplyF = op => {
	return pipe(
		op.multipliers,
		pipe(
			liftNumeric,
			traverseAccumulate((a, b) => [...a, ...b]),
		),
		pipe(
			(nums: Option<number>[]) => () =>
				pipe(
					nums,
					sequence,
					mapOption(
						pipe(
							MULTIPLICATION_IDENTITY,
							reduce((sum, n: number) => sum * n),
						),
					),
					right,
				),
			match(errors => () => left(errors)),
		),
	)
}

export default multiply
