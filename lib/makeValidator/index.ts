import fromNullable from "@sitebender/fp/lib/option/fromNullable"
import map from "@sitebender/fp/lib/option/map"
import right from "@sitebender/fp/lib/either/right"
import { default as mapEither } from "@sitebender/fp/lib/either/map"
import flatMap from "@sitebender/fp/lib/either/flatMap"
import { OperationResult } from "../operations/operationResult/types"
import { SbConditionalOperation } from "../types"
import castValue from "../utilities/castValue"
import pipe from "@sitebender/fp/lib/functions/pipe"
import some from "@sitebender/fp/lib/option/some"
import { Option, getOrElse, none } from "@sitebender/fp/lib/option"
import evaluateValidationNumericOperation from "../operations/conditional/evaluateConditionalOperation"

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
