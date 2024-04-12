import { Option, map as mapOption } from "@sitebender/fp/lib/option"
import { left, right, match, Either } from "@sitebender/fp/lib/either"
import liftNumeric from "../../operations/liftNumerical"
import pipe from "@sitebender/fp/lib/functions/pipe"

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
