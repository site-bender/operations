import liftNumeric from "../../operations/liftNumerical"
import map from "../../array/map"
import { left, right, match as matchEither, allOf } from "../../fp/either"
import { some, match as matchOption } from "../../fp/option"

import { pipe } from "../../fp/functions"
import sum from "../../array/reduce/sum"

type AddF = (op: AddOperation) => () => Either<Array<string>, Option<number>>

const add: AddF = op => {
	return pipe(
		allOf(liftNumeric)(op.addends),
		pipe(
			(numbers: Option<number>[]) => () =>
				pipe(
					numbers,
					map(matchOption(() => 0)((a: number) => a)),
					sum,
					some,
					right,
				),
			matchEither(errors => () => left(errors)),
		),
	)
}

export default add
