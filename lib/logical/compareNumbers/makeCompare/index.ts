import getComparator from "../getComparator"
import { map } from "../../../fp/either"
import { pipe } from "../../../fp/functions"
import { Lazy } from "../../../fp/lazy"

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
