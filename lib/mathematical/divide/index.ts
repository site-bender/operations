import type { DivideOperation } from "../../types"

import { Option, some, getOrElse } from "@sitebender/fp/lib/option"
import {
	Either,
	allOf,
	left,
	match as matchEither,
	right,
} from "@sitebender/fp/lib/either"
import liftNumeric from "../../operations/liftNumerical"
import pipe from "@sitebender/fp/lib/functions/pipe"

export type Divide = (
	operation: DivideOperation,
) => () => Either<Array<string>, Option<number>>

const divide: Divide = op => {
	return pipe(
		allOf(liftNumeric)([op.dividend, op.divisor]),
		pipe(
			([maybeDividend, maybeDivisor]: Option<number>[]) =>
				() => {
					const dividend = getOrElse(() => 0)(maybeDividend)
					const divisor = getOrElse(() => 1)(maybeDivisor)
					const quotient = dividend / divisor

					return Number.isNaN(quotient) || quotient === Infinity
						? left(["Invalid numeric operation: divide."])
						: right(some(quotient))
				},
			matchEither(errors => () => left(errors)),
		),
	)
}

export default divide
