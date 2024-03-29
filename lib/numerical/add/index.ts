import type { Either } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"
import { right, traverseArray, match, left } from "fp-ts/lib/Either"

import { evaluateNumericOperations } from "../../operations/compose"

import { ADDITION_IDENTITY } from "../../constants"

const lift = (addend: number | NumericOperation): Either<string[], number> =>
	typeof addend === "number"
		? right<string[], number>(addend)
		: evaluateNumericOperations(addend)()

type Add = (op: AddOperation) => () => Either<Array<string>, number>
const add: Add = op => {
	return pipe(
		op.addends,
		traverseArray(lift),
		match(
			errs => () => left(errs),
			nums => () =>
				right(nums.reduce((sum, operand) => sum + operand, ADDITION_IDENTITY)),
		),
	)
}

export default add
