import type { IO } from "fp-ts/lib/IO"

import getComparator from "../getComparator"
import { map } from "../../../fp/either"
import { pipe } from "../../../fp/functions"

type MakeCompareF = (
	operation: Operation["operation"],
) => (operand: number) => (test: number) => IO<Either<string[], boolean>>

const makeCompare: MakeCompareF = operation => operand => test => {
	//if (isNone(operand) || isNone(test)) {
	//	return () => right(none)
	//}

	return () =>
		pipe(
			getComparator(operation),
			map(comparator => pipe(test, comparator(operand))),
		)
}

export default makeCompare
