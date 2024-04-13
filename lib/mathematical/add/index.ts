import type { AddOperation } from "../../types"

import liftNumeric from "../../operations/liftNumerical"
import map from "@sitebender/fp/lib/array/map"
import { e, o } from "@sitebender/fp"
import { Either, allOf, right, left } from "@sitebender/fp/lib/either"
import { Option, some } from "@sitebender/fp/lib/option"
import { pipe } from "@sitebender/fp/lib/functions"

import sum from "@sitebender/fp/lib/array/reduce/sum"

export type AddF = (
	op: AddOperation,
) => () => Either<Array<string>, Option<number>>

const add: AddF = op => {
	return pipe(
		allOf(liftNumeric)(op.addends),
		pipe(
			(numbers: Option<number>[]) => () =>
				pipe(
					numbers,
					map(o.match(() => 0)((a: number) => a)),
					sum,
					some,
					right,
				),
			e.match(errors => () => left(errors)),
		),
	)
}

export default add
