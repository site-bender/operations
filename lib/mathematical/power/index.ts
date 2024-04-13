import type { PowerOperation } from "../../types"

import { Option, map, sequence } from "@sitebender/fp/lib/option"
import { Either, allOf, left, match, right } from "@sitebender/fp/lib/either"
import liftNumeric from "../../operations/liftNumerical"
import pipe from "@sitebender/fp/lib/functions/pipe"

export type PowerF = (
	operation: PowerOperation,
) => () => Either<Array<string>, Option<number>>

const power: PowerF = op => {
	return pipe(
		[op.base, op.exponent],
		pipe(liftNumeric, allOf),
		pipe(
			([base, exponent]: Array<Option<number>>) =>
				() =>
					pipe(
						[base, exponent],
						sequence,
						map(([base, exponent]) => Math.pow(base, exponent)),
						right,
					),
			match(errors => () => left(errors)),
		),
	)
}

export default power
