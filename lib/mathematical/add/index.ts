import * as Option from "../../fp/option"
import * as Either from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"
import map from "../../array/map"

import { ADDITION_IDENTITY } from "../../constants"
import traverseAccumulate from "../../fp/either/traverseAccumulate"
import { pipe } from "../../fp/functions"
import reduce from "../../array/reduce"

type AddF = (op: AddOperation) => () => Either<Array<string>, Option<number>>

const add: AddF = op => {
	return pipe(
		op.addends,
		pipe(
			liftNumeric,
			traverseAccumulate((a, b) => [...a, ...b]),
		),
		pipe(
			(numbers: Option<number>[]) => () =>
				pipe(
					numbers,
					map(Option.match(() => 0)((a: number) => a)),
					pipe(
						ADDITION_IDENTITY,
						reduce((a, b: number) => a + b),
					),
					Option.some,
					Either.right,
				),
			Either.match(errors => () => Either.left(errors)),
		),
	)
}

export default add
