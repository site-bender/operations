import type { SbConditionalOperation } from "../../../../types"

import { Lazy } from "@sitebender/fp/lib/lazy"
import getComparator from "../getComparator"
import { Either, map } from "@sitebender/fp/lib/either"
import { pipe } from "@sitebender/fp/lib/functions"

export type MakeCompareF = (
	operation: SbConditionalOperation["operation"],
) => (operand: number) => (test: number) => Lazy<Either<string[], boolean>>

const makeCompare: MakeCompareF = operation => operand => test => {
	return () =>
		pipe(
			getComparator(operation),
			map(comparator => pipe(test, comparator(operand))),
		)
}

export default makeCompare
