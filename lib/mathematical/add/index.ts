import { pipe } from "fp-ts/lib/function"
import { traverseArray, match } from "fp-ts/lib/Either"

import { isNone, none, some } from "../../fp/option"
import { left, right } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"
import reduce from "../../array/reduce"

import { ADDITION_IDENTITY } from "../../constants"

type AddF = (op: AddOperation) => () => Either<Array<string>, Option<number>>

const add: AddF = op => {
	return pipe(
		op.addends,
		traverseArray(liftNumeric),
		match(
			errors => () => left(errors),
			nums => () =>
				right(
					reduce((sum: Option<number>, n: Option<number>) =>
						// there must be a way to do this with pipe, flow, and/or map
						isNone(sum) || isNone(n)
							? none
							: some((sum as Some<number>).value + (n as Some<number>).value),
					)(some(ADDITION_IDENTITY))(nums as Array<Option<number>>),
				),
		),
	)
}

export default add
