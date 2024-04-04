import { map, sequence } from "../../fp/option"
import { allOf, left, match, right } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"
import pipe from "../../fp/functions/pipe"

type PowerF = (
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
