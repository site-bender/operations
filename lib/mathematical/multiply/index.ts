import { map as mapOption, sequence } from "../../fp/option"
import { left, right, match, allOf } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"
import { default as multiplyArray } from "../../array/reduce/multiply"

import pipe from "../../fp/functions/pipe"

type MultiplyF = (
	op: MultiplyOperation,
) => () => Either<Array<string>, Option<number>>

const multiply: MultiplyF = op => {
	return pipe(
		allOf(liftNumeric)(op.multipliers),
		pipe(
			(nums: Option<number>[]) => () =>
				pipe(nums, sequence, mapOption(multiplyArray), right),
			match(errors => () => left(errors)),
		),
	)
}

export default multiply
