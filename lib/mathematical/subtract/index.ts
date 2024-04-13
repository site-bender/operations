import type { SubtractOperation } from "../../types"

import {
	Option,
	some,
	map,
	sequence,
	getOrElse,
	none,
} from "@sitebender/fp/lib/option"
import { Either, match, left, right, allOf } from "@sitebender/fp/lib/either"
import liftNumeric from "../../operations/liftNumerical"
import pipe from "@sitebender/fp/lib/functions/pipe"

export type SubtractF = (
	o: SubtractOperation,
) => () => Either<Array<string>, Option<number>>

const divide: SubtractF = op => {
	return pipe(
		allOf(liftNumeric)([op.minuend, op.subtrahend]),
		pipe(
			([minuend, subtrahend]: Array<Option<number>>) =>
				() =>
					pipe(
						[minuend, subtrahend],
						sequence,
						map(([minuend, subtrahend]) => {
							const difference = minuend - subtrahend

							return Number.isNaN(difference)
								? left(["Invalid numeric operation: divide."])
								: right(some(difference))
						}),
						getOrElse((): Either<Array<string>, Option<number>> => right(none)),
					),
			match(errors => () => left(errors)),
		),
	)
}

export default divide
