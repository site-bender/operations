import liftNumeric from "../../operations/liftNumerical"
import map from "../../array/map"
import { left, right, match as matchEither } from "../../fp/either"
import { some, match as matchOption } from "../../fp/option"

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
					map(matchOption(() => 0)((a: number) => a)),
					pipe(
						ADDITION_IDENTITY,
						reduce((a, b: number) => a + b),
					),
					some,
					right,
				),
			matchEither(errors => () => left(errors)),
		),
	)
}

export default add
