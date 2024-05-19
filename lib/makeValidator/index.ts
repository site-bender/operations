import type { OperationResult } from "../operations/operationResult/types"
import type { SbConditionalOperation } from "../types"
import type { Option } from "@sitebender/fp/lib/option"

import castValue from "../utilities/castValue"
import evaluateValidationNumericOperation from "../operations/conditional/evaluateConditionalOperation"
import flatMap from "@sitebender/fp/lib/either/flatMap"
import fromNullable from "@sitebender/fp/lib/option/fromNullable"
import getOrElse from "@sitebender/fp/lib/option/getOrElse"
import map from "@sitebender/fp/lib/option/map"
import none from "@sitebender/fp/lib/option/none"
import pipe from "@sitebender/fp/lib/functions/pipe"
import right from "@sitebender/fp/lib/either/right"
import some from "@sitebender/fp/lib/option/some"
import { default as mapEither } from "@sitebender/fp/lib/either/map"

type MakeValidator = (
	op: SbConditionalOperation,
) => (value?: string) => OperationResult<number>

const makeValidator: MakeValidator = op => input =>
	pipe(
		input,
		fromNullable,
		map(castValue("number")),
		map(eitherNum => pipe(eitherNum, mapEither(some))),
		getOrElse(() => right<Option<number>, string[]>(none)),
		flatMap(evaluateValidationNumericOperation(op)),
	)

export default makeValidator
