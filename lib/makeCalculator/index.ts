import { type OperationResult } from "../operations/operationResult/types"
import { type SbNumericOperation } from "../types"
import { type Option } from "@sitebender/fp/lib/option/types"

import castValue from "../utilities/castValue"
import flatMap from "@sitebender/fp/lib/either/flatMap"
import fromNullable from "@sitebender/fp/lib/option/fromNullable"
import getOrElse from "@sitebender/fp/lib/option/getOrElse"
import liftNumeric from "../old/operations/liftNumerical"
import map from "@sitebender/fp/lib/option/map"
import none from "@sitebender/fp/lib/option/none"
import pipe from "@sitebender/fp/lib/functions/pipe"
import right from "@sitebender/fp/lib/either/right"
import some from "@sitebender/fp/lib/option/some"
import { default as mapEither } from "@sitebender/fp/lib/either/map"

type MakeCalculator = (
	op: SbNumericOperation,
) => (value?: string) => OperationResult<number>

const makeCalculator: MakeCalculator = op => input => {
	const liftedInput = pipe(
		input,
		fromNullable,
		map(castValue("number")),
		map(eitherNum => pipe(eitherNum, mapEither(some))),
		getOrElse(() => right<Option<number>, string[]>(none)),
	)

	return pipe(
		liftedInput,
		flatMap(inputNum => liftNumeric(inputNum)(op)),
	)
}

export default makeCalculator
