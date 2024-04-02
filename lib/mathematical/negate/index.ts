import { pipe } from "fp-ts/lib/function"
import { traverseArray, match } from "fp-ts/lib/Either"

import { some } from "../../fp/option"
import { left, right } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"

type Negate = (
	operation: NegateOperation,
) => () => Either<Array<string>, Option<number>>

const negate: Negate = op => {
	return pipe(
		[op.operand],
		traverseArray(liftNumeric),
		match(
			errors => () => left(errors),
			([operand]: Array<Some<number>>) =>
				() =>
					right(some(-(operand as Some<number>).value)),
		),
	)
}

export default negate
