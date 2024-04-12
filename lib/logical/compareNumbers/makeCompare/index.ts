import { Lazy } from "@sitebender/fp/lib/lazy"
import getComparator from "../getComparator"
import { Either, map } from "@sitebender/fp/lib/either"
import { pipe } from "@sitebender/fp/lib/functions"

type MakeCompareF = (
	operation: Operation["operation"],
) => (operand: number) => (test: number) => Lazy<Either<string[], boolean>>

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
