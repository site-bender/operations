import { map as mapOption } from "../../fp/option"
import { left, right, match } from "../../fp/either"
import liftNumeric from "../../operations/liftNumerical"
import pipe from "../../fp/functions/pipe"

type Negate = (
	operation: NegateOperation,
) => () => Either<Array<string>, Option<number>>

const negate: Negate = op => {
	return pipe(
		op.operand,
		liftNumeric,
		pipe(
			(operand: Option<number>) => () =>
				pipe(
					operand,
					mapOption(o => -o),
					right,
				),
			match(errors => () => left(errors)),
		),
	)
}

export default negate
