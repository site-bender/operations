import type { MultiplyOperation } from "../../types"

import { Option, map as mapOption, sequence } from "@sitebender/fp/lib/option"
import { Either, left, right, match, allOf } from "@sitebender/fp/lib/either"
import liftNumeric from "../../operations/liftNumerical"
import { default as multiplyArray } from "@sitebender/fp/lib/array/reduce/multiply"
import pipe from "@sitebender/fp/lib/functions/pipe"

export type MultiplyF = (
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
