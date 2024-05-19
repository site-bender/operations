import type { OperationResult } from "../operations/operationResult/types"
import type { SbTernaryOperation } from "../types"
import type { Option } from "@sitebender/fp/lib/option"

import castValue from "../utilities/castValue"
import flatMap from "@sitebender/fp/lib/either/flatMap"
import fromNullable from "@sitebender/fp/lib/option/fromNullable"
import getOrElse from "@sitebender/fp/lib/option/getOrElse"
import map from "@sitebender/fp/lib/option/map"
import none from "@sitebender/fp/lib/option/none"
import pipe from "@sitebender/fp/lib/functions/pipe"
import right from "@sitebender/fp/lib/either/right"
import some from "@sitebender/fp/lib/option/some"
import { default as mapEither } from "@sitebender/fp/lib/either/map"
import evaluateTernaryOperation from "../operations/ternary/evaluateTernaryOperation"

type MakeTernary = (
	op: SbTernaryOperation,
) => (value?: string) => OperationResult<number>

const makeTernary: MakeTernary = op => input => {
	const liftedInput = pipe(
		input,
		fromNullable,
		map(castValue("number")),
		map(eitherNum => pipe(eitherNum, mapEither(some))),
		getOrElse(() => right<Option<number>, string[]>(none)),
	)

	return pipe(liftedInput, flatMap(evaluateTernaryOperation(op)))
}

export default makeTernary
