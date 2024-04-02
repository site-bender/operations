import type { IO } from "fp-ts/lib/IO"
import { isNone, none, some } from "../../../fp/option"

import getComparator from "../getComparator"

type MakeCompareF = (
	operation: Operation["operation"],
) => (
	operand: Option<number>,
) => (test: Option<number>) => IO<Some<boolean | void> | None>

const makeCompare: MakeCompareF = operation => operand => test => {
	const compare = getComparator(operation)

	if (isNone(operand) || isNone(test)) {
		return () => none
	}

	const x = (operand as Some<number>).value
	const y = (test as Some<number>).value

	return () => some(compare(x)(y))
}

export default makeCompare
